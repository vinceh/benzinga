module.exports = {
  methods: {
    dollar (val) {
      return Math.floor(val)
    },
    cents (val) {
      return (val % 1).toFixed(2).substring(2)
    },
    numberWithCommas (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    updownClass (val) {
      if (val >= 0) {
        return 'up'
      } else {
        return 'down'
      }
    }
  }
}
