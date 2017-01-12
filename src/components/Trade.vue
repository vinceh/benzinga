<template>
  <div>
    <div class="overworld"
         v-if="initialLoading">
      <img src="https://dsgcewkenvygd.cloudfront.net/assets/balls.svg"/>
    </div>
    <div class="header">
      <div class="logo">
        EXCHANGE
      </div>
      <div class="reset"
           @click="resetData">
        reset data
      </div>
    </div>
    <div class="container">
      <div class="left">
        <div class="portfolio">
          <div class="title">
            My Portfolio
            <i class="mdi mdi-settings"></i>
          </div>
          <div class="big-numbers">
            <!-- <div class="value-item">
              <div class="label">
                portfolio value
              </div>
              <div class="value">
                <span class="dollar-sign">$</span>4,812<span class="cents">.56</span>
              </div>
            </div>
            <div class="value-item">
              <div class="label">
                net worth
              </div>
              <div class="value">
                <span class="dollar-sign">$</span>4,812<span class="cents">.56</span>
              </div>
            </div> -->
            <div class="value-item">
              <div class="label">
                cash
              </div>
              <div class="value">
                <span class="dollar-sign">$</span>{{ numberWithCommas(dollar(balance)) }}<span class="cents" v-if="cents(balance) > 0">.{{ cents(balance) }}</span><span class="cents" v-else>.00</span>
              </div>
            </div>
          </div>
          <div class="assets-wrap">
            <div v-if="portfolio.length > 0">
              <table>
                <tr>
                  <th>Company</th>
                  <th>Quantity Owned</th>
                  <th>Total Value</th>
                </tr>
                <stock-row v-for="stock in portfolio"
                           :stock-data="stock"
                           @showStock="showStock"></stock-row>
              </table>
            </div>
            <div class="no-stocks" v-else>
              No Stocks in Portfolio
            </div>
          </div>
        </div>
      </div>
      <div class="symbol-search-wrap right">
        <div class="input-wrap">
          <input type="text"
                 placeholder="Search for a symbol..." tabindex="1"
                 v-model="searchSymbol"
                 @keydown.enter="search"
                 onClick="this.select();">
          <span class="error"
                v-if="searchError">Unknown Symbol</span>
          <img src="https://dsgcewkenvygd.cloudfront.net/assets/balls.svg"/>
        </div>
        <stock v-if="currentStock"
               :stock-data="currentStock"
               :current-owned="currentlyOwned(currentStock)"
               :current-money="balance"
               @buyStock="buyStock"
               @sellStock="sellStock"></stock>
      </div>
    </div>
  </div>
</template>

<script>
import Stock from './Stock'
import StockRow from './StockRow'

export default {
  data () {
    return {
      balance: null,
      portfolio: [],
      initialLoading: true,
      currentStock: null,
      searching: false,
      searchError: false
    }
  },
  components: {
    Stock, StockRow
  },
  methods: {
    inputClass () {
      if (this.searching) {
        return 'loading'
      } else {
        return ''
      }
    },
    showStock (symbol) {
      this.searching = true
      this.searchError = false
      this.findStock(symbol).then((stockData) => {
        this.currentStock = stockData
        this.searching = false
      })
    },
    search () {
      if (this.searchSymbol) {
        this.searching = true
        this.searchError = false
        this.findStock(this.searchSymbol).then((stockData) => {
          this.currentStock = stockData
          this.searching = false
        }).catch((msg) => {
          this.searching = false
          this.searchError = true
        })
      }
    },
    currentlyOwned (stock) {
      var portStock = this.findStockInPortfolio(stock[Object.keys(stock)[0]])
      if (portStock) {
        return portStock.qty
      } else {
        return 0
      }
    },
    findStockInPortfolio (symbolData) {
      return this.portfolio.find((el) => {
        return el.symbol === symbolData.symbol
      })
    },
    sellStock (symbolData, qty) {
      var stock = this.findStockInPortfolio(symbolData)
      stock.qty -= qty
      if (stock.qty === 0) {
        this.portfolio.splice(this.portfolio.indexOf(stock), 1)
      }
      this.savePortfolio(this.portfolio)

      this.balance += this.roundCurrency(symbolData.bidPrice * qty)
      this.saveBalance(this.balance * 100)
    },
    buyStock (symbolData, qty) {
      var stock = this.findStockInPortfolio(symbolData)

      // we have this stock already, buying more!
      if (stock) {
        stock.qty += qty
      } else {
        // we don't got this stock
        this.portfolio.push({
          symbol: symbolData.symbol,
          companyName: symbolData.name,
          qty: qty
        })
      }
      this.savePortfolio(this.portfolio)

      // deduct the money!
      this.balance -= this.roundCurrency(symbolData.askPrice * qty)
      this.saveBalance(this.balance * 100)
    },
    resetData () {
      this.portfolio = []
      this.savePortfolio(this.portfolio)
      this.balance = 100000
      this.saveBalance(this.balance * 100)
    }
  },
  created () {
    this.balance = this.getBalance()
    this.portfolio = this.getPortfolio()
    this.initialLoading = false
  }
}
</script>

<style lang="scss" scoped="true">
@import "../assets/css/vendor/bourbon";
@import "../assets/css/colors";

.header {
  background-color: shade($prime, 15%);
  display: table;
  width: 100%;
  &>div {
    line-height: 1em;
    font-size: 15px;
    padding: 20px 0;
  }
  .logo {
    padding-left: 30px;
    padding-right: 30px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: $second;
    float: left;
  }
  .reset {
    float: right;
    padding-right: 30px;
    color: $second;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

.container {
  display: flex;
  flex-direction: row;
  padding: 15px;
  &>div {
    padding: 15px;
  }
  .left {
    width: 65%;
  }
  .right {
    width: 35%;
  }
  .portfolio {
    background-color: #4c515b;
    box-shadow: 0 0 15px shade(#4c515b, 25%);
    border-radius: 3px;
    .title {
      padding: 20px;
      position: relative;
      i {
        float: right;
        opacity: 0.3;
        &:hover {
          cursor: pointer;
          opacity: 0.5;
        }
      }
    }
    .big-numbers {
      display: flex;
      padding: 20px 0 30px;
      .value-item {
        width: 100%;
      }
    }
  }
  .symbol-search-wrap {
    .input-wrap {
      position: relative;
      & > input {
        box-sizing: border-box;
        width: 100%;
        background-color: transparent;
        border: 1px solid tint($prime, 10%);
        border-radius: 999px;
        padding: 12px 19px;
        color: #FFFFFA;
        &:hover {
          cursor: pointer;
          border: 1px solid tint($prime, 15%);
        }
        &:focus {
          border: 1px solid tint($prime, 15%);
          background-color: tint($prime, 5%)
        }
      }
      &.loading {
        img {
          opacity: 1;
        }
      }
      img {
        opacity: 0;
        position: absolute;
        right: 5px;
        top: 0px;
        height: 44px;
      }
      .error {
        position: absolute;
        right: 20px;
        top: 17px;
        font-size: 12px;
        color: $red;
        z-index: 99;
      }
    }
  }
}

.no-stocks {
  padding: 15px;
  opacity: 0.5;
  text-align: center;
  border-top: 1px dashed #888;
}

body {
  font-size: 15px;
}
</style>
