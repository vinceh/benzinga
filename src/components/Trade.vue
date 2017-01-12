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
    </div>
    <div class="container">
      <div class="left">
        <div class="portfolio">
          <div class="title">
            My Portfolio
            <i class="mdi mdi-settings"></i>
          </div>
          <div class="big-numbers">
            <div class="value-item">
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
                <span class="dollar-sign">$</span>103,321<span class="cents">.23</span>
              </div>
            </div>
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
            <table>
              <tr>
                <th>Company</th>
                <th>QTY</th>
                <th>Purchased</th>
                <th>Current</th>
                <th>Delta</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>AAPL</td>
                <td>215</td>
                <td>$108.33</td>
                <td>$117.91</td>
                <td class="green">+9.58(10.2%)</td>
                <td>$25,350.65(<span class="green">+2059.7</span>)</td>
              </tr>
              <tr>
                <td>Apple(AAPL)</td>
                <td>215</td>
                <td>$108.33</td>
                <td>$117.91</td>
                <td class="red">-9.58</td>
                <td>$25350.65(<span class="red">-2059.7</span>)</td>
              </tr>
              <tr>
                <td>Apple(AAPL)</td>
                <td>215</td>
                <td>$108.33</td>
                <td>$117.91</td>
                <td class="red">-9.58</td>
                <td>$25350.65(<span class="red">-2059.7</span>)</td>
              </tr>
              <tr>
                <td>Apple(AAPL)</td>
                <td>215</td>
                <td>$108.33</td>
                <td>$117.91</td>
                <td class="green">+9.58</td>
                <td>$25350.65(<span class="green">+2059.7</span>)</td>
              </tr>
              <tr>
                <td>Apple(AAPL)</td>
                <td>215</td>
                <td>$108.33</td>
                <td>$117.91</td>
                <td class="green">+9.58</td>
                <td>$25350.65(<span class="green">+2059.7</span>)</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="symbol-search-wrap right">
        <div class="input-wrap"
             :class="inputClass()">
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
               :current-owned="currentlyOwned(currentStock)"></stock>
      </div>
    </div>
  </div>
</template>

<script>
import Stock from './Stock'

export default {
  data () {
    return {
      balance: null,
      portfolio: [],
      initialLoading: true,
      currentStock: null,
      searching: false
    }
  },
  components: {
    Stock
  },
  methods: {
    inputClass () {
      if (this.searching) {
        return 'loading'
      } else {
        return ''
      }
    },
    search () {
      this.searching = true
      this.searchError = false
      this.findStock(this.searchSymbol).then((stockData) => {
        this.currentStock = stockData
        this.searching = false
      }).catch((msg) => {
        this.searching = false
        this.searchError = true
      })
    },
    currentlyOwned (stock) {
      return 213
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
        width: 33%;
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
  .assets-wrap {
    table {
      width: 100%;
      text-align: left;
      color: #ddd;
      font-size: 14px;
    }
    th, td {
      padding: 17px 20px;
    }
    th {
      font-size: 13px;
      color: tint($prime, 30%);
      text-transform: uppercase;
      letter-spacing: 1px;
      &:hover {
        cursor: pointer;
        color: tint($prime, 50%);
      }
    }
    td {
      // border-top: 1px solid tint($dark, 10%);
    }
    tr {
      &:nth-child(2n) {
        td {
          background-color: tint(#4c515b, 3%);
        }
      }
      &:hover {
        td {
          cursor: pointer;
          background-color: tint(#4c515b, 5%);
        }
      }
    }
  }
}

body {
  font-size: 15px;
}
</style>
