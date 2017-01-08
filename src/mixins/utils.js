module.exports = {
  methods: {
    dollar (val) {
      return Math.floor(val)
    },
    cents (val) {
      return val % 1
    },
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
