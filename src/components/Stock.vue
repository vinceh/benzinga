<template>
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
</template>

<script>
export default {
  props: ['data', 'maxSell'],
  data () {
    return {}
  },
  methods () {

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
</style>
