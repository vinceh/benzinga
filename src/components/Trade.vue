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
        <input type="text" placeholder="Search for a symbol..." tabindex="1">
        <div class="result">
          <div class="title">
            <div class="change up">
              +1.3(1.11%)
            </div>
            <div class="symbol">
              Apple
              <span class="bold">
                (AAPL)
              </span>
            </div>
            <div class="subtext">
              <span class="label">Open</span> $116.78
            </div>
            <div class="subtext">
              <span class="label">Volume</span> 31,751,900
            </div>
            <div class="subtext">
              <span class="label">52 Week High</span> $119.86
            </div>
            <div class="subtext">
              <span class="label">52 Week Low</span> $89.47
            </div>
            <div class="subtext">
              <span class="label">Industry</span> Consumer Electronics
            </div>
          </div>
          <div class="details">
            <div class="value-item">
              <div class="label">
                bid
              </div>
              <div class="value">
                <span class="dollar-sign">$</span>117<span class="cents">.79</span>
              </div>
            </div>
            <div class="value-item">
              <div class="label">
                ask
              </div>
              <div class="value">
                <span class="dollar-sign">$</span>117<span class="cents">.84</span>
              </div>
            </div>
          </div>
          <div class="actions">
            <button type="button" class="outline">sell</button>
            <button type="button">buy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      balance: null,
      portfolio: [],
      initialLoading: true
    }
  },
  methods () {

  },
  created () {
    this.balance = this.getBalance()
    this.portfolio = this.getPortfolio()
    this.initialLoading = false

    console.log('portfolio', this.portfolio)
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
  .value-item {
    text-align: center;
    border-right: 1px solid tint($prime, 15%);
    padding: 20px 0;
    &:last-child {
      border-right: none;
    }
    .label {
      text-transform: uppercase;
      font-size: 13px;
      opacity: 0.5;
      letter-spacing: 1px;
    }
    .value {
      font-size: 30px;
      letter-spacing: 1px;
      margin-top: 20px;
      .dollar-sign {
        font-size: 14px;
        position: relative;
        top: -1px;
        margin-right: 2px;
      }
      .cents {
        font-size: 14px;
      }
    }
  }
  .symbol-search-wrap {
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
        &.up {
          color: $green;
        }
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
    .actions {
      display: flex;
      margin: 6px;
      button {
        width: 50%;
        margin: 6px;
      }
    }
  }
}

body {
  font-size: 15px;
}
</style>
