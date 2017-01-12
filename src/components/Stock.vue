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
      <input type="text"
             placeholder="Enter a quantity">
    </div>
    <div class="actions">
      <button type="button" class="outline">sell</button>
      <button type="button">buy</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stockData', 'currentOwned'],
  data () {
    return {}
  },
  methods: {
    symbol () {
      return this.stockData[Object.keys(this.stockData)[0]].symbol
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
    padding: 30px 0;
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
