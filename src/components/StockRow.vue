<template>
  <tr @click="showStock">
    <td>{{ stockData.companyName}} ({{ stockData.symbol }})</td>
    <td>{{ stockData.qty }}</td>
    <td>
      <span v-if="loading">loading...</span>
      <span v-else>${{ numberWithCommas(stockData.currentValue) }}</span>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['stockData'],
  data () {
    return {
      loading: true
    }
  },
  methods: {
    updateStockValue () {
      this.findStock(this.stockData.symbol).then((data) => {
        this.$set(this.stockData, 'currentValue', (this.stockData.qty * data[Object.keys(data)].lastTradePrice).toFixed(2))
        // this.stockData.currentValue = (this.stockData.qty * data[Object.keys(data)].lastTradePrice).toFixed(2)
        this.loading = false
      })
    },
    showStock () {
      this.$emit('showStock', this.stockData.symbol)
    }
  },
  computed: {
  },
  created () {
    this.updateStockValue()
  },
  beforeUpdate () {
    this.loading = false
    this.updateStockValue()
  }
}
</script>

<style lang="scss" scoped="true">
@import "../assets/css/vendor/bourbon";
@import "../assets/css/colors";

</style>
