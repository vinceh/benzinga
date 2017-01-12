<template>
  <div class="result">
    <!--
      Syntax is weird here because we are using the ::before CSS
      attribute and also because spans/newlines cause spaces
      and we want to avoid those
    -->
    <div class="title">
      <div class="change"
           :class="updownClass(data.change)">{{ data.change }}(<span class="percentChange">{{ data.changePercent}}%)</span></div>
      <div class="symbol">
        {{ data.name }}
        <span class="bold">
          ({{ data.symbol }})
        </span>
      </div>
      <div class="subtext">
        <span class="label">Open</span> ${{ numberWithCommas(data.open) }}
      </div>
      <div class="subtext">
        <span class="label">Volume</span> {{ numberWithCommas(data.volume) }}
      </div>
      <div class="subtext">
        <span class="label">52 Week High</span> ${{ numberWithCommas(data.fiftyTwoWeekHigh) }}
      </div>
      <div class="subtext">
        <span class="label">52 Week Low</span> ${{ numberWithCommas(data.fiftyTwoWeekLow) }}
      </div>
      <div class="subtext">
        <span class="label">Industry</span> {{ data.industry }}
      </div>
    </div>
    <div class="details">
      <div class="value-item">
        <div class="label">
          bid
        </div>
        <div class="value">
          <span class="dollar-sign">$</span>{{ numberWithCommas(dollar(data.bidPrice)) }}<span class="cents">.{{ cents(data.bidPrice) }}</span>
        </div>
      </div>
      <div class="value-item">
        <div class="label">
          ask
        </div>
        <div class="value">
          <span class="dollar-sign">$</span>{{ numberWithCommas(dollar(data.askPrice)) }}<span class="cents">.{{ cents(data.askPrice) }}</span>
        </div>
      </div>
    </div>
    <div class="quantity-wrap">
      <div class="you-own">
        You currently own <span class="bold">{{ currentOwned }}</span> shares of <span class="bold">{{ data.symbol }}</span>
      </div>
      <div class="qty-input-wrap">
        <input type="number"
               min="1"
               placeholder="Enter a quantity"
               onClick="this.select();"
               @keydown="checkKeys"
               v-model="quantity">
         <span class="error">{{ searchError }}</span>
      </div>
    </div>
    <div class="actions">
      <button type="button" class="outline"
              @click="sell">sell</button>
      <button type="button"
              @click="buy">buy</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stockData', 'currentOwned', 'currentMoney'],
  data () {
    return {
      searchError: null,
      quantity: null
    }
  },
  watch: {
    stockData (newData) {
      this.searchError = null
      this.quantity = null
    }
  },
  methods: {
    symbol () {
      return this.stockData[Object.keys(this.stockData)[0]].symbol
    },
    checkKeys (e) {
      // check for '-' and '.' keys and '+'
      // also check for leading 0's
      if (e.keyCode === 189 || e.keyCode === 109 || e.keyCode === 110 || e.keyCode === 190 || e.keyCode === 107) {
        e.preventDefault()
      } else if (!parseInt(this.quantity) && (e.keyCode === 48 || e.keyCode === 96)) {
        e.preventDefault()
      }
    },
    sell () {
      var pat = /^[1-9][0-9]*$/
      var qty = parseInt(this.quantity)
      this.searchError = null

      // check for copy-paste floats
      if (this.quantity % 1 !== 0) {
        this.searchError = 'Invalid Quantity'
      }

      // check for valid numbers + affordance
      if (qty.toString().search(pat) >= 0) {
        if (this.currentOwned >= qty) {
          // all is well! emit the event
          this.$emit('sellStock', this.data, qty)
          this.quantity = null
        } else {
          this.searchError = 'Insufficient Quantity Owned'
        }
      } else {
        this.searchError = 'Invalid Input'
      }
    },
    buy () {
      var pat = /^[1-9][0-9]*$/
      var qty = parseInt(this.quantity)
      this.searchError = null

      // check for copy-paste floats
      if (this.quantity % 1 !== 0) {
        this.searchError = 'Invalid Quantity'
      }

      // check for valid numbers + affordance
      if (qty.toString().search(pat) >= 0) {
        if (this.canAfford(qty)) {
          // all is well! emit the event
          this.$emit('buyStock', this.data, qty)
          this.quantity = null
        } else {
          this.searchError = 'Insufficient Funds'
        }
      } else {
        this.searchError = 'Invalid Input'
      }
    },
    canAfford (qty) {
      return (qty * this.valInCents(this.data.askPrice)) <= this.valInCents(this.currentMoney)
    }
  },
  computed: {
    data () {
      return this.stockData[this.symbol()]
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped="true">
@import "../assets/css/vendor/bourbon";
@import "../assets/css/colors";

.result {
  background-color: #4d505a;
  border-radius: 3px;
  margin-top: 20px;
  overflow: hidden;
  box-shadow: 0 0 15px shade(#4c515b, 25%);
  .title {
    background-color: #5b5f69;
    padding: 20px 20px;
    font-weight: lighter;
    position: relative;
    .change {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 25px;
    }
    .symbol {
      font-size: 25px;
      letter-spacing: 1px;
      margin-bottom: 15px;
    }
    .subtext {
      font-size: 14px;
      line-height: 1.6em;
      .label {
        color: tint($dark, 45%);
        margin-right: 2px;
      }
    }
  }
  .details {
    display: flex;
    padding: 20px 0;
    .value-item {
      width: 50%;
      border-right: 1px solid tint($prime, 15%);
      .value {
        font-size: 40px;
      }
    }
  }
  .quantity-wrap {
    padding: 13px;
    padding-bottom: 0;
    .qty-input-wrap {
      position: relative;
      .error {
        opacity: 0.8;
        color: $red;
        position: absolute;
        right: 12px;
        top: 14px;
        font-size: 13px;
      }
    }
    .you-own {
      margin-bottom: 10px;
    }
    input {
      width: 100%;
      border-radius: 2px;
      padding: 10px;
      box-sizing: border-box;
    }
  }
  .actions {
    display: flex;
    margin: 6px;
    button {
      width: 50%;
      margin: 6px;
    }
  }
}
</style>
