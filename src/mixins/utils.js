module.exports = {
  methods: {
    dollar (val) {
      return Math.floor(val)
    },
    cents (val) {
      return (val % 1).toFixed(2).substring(2)
    },
    numberWithCommas (x) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      } else {
        return 0
      }
    },
    updownClass (val) {
      if (val >= 0) {
        return 'up'
      } else {
        return 'down'
      }
    },
    valInCents (val) {
      return Math.floor((val * 100))
    },
    roundCurrency (val) {
      return Math.round(val * 100) / 100
    }
  }
}
