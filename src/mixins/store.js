/*  This exists as a simple store for the app
 *  to fetch data.
 */

import Vue from 'vue'

module.exports = {
  methods: {
    getBalance () {
      var balance = window.localStorage.getItem('balance')
      if (!balance) {
        balance = 10000000
        window.localStorage.getItem('balance')
      }
      return balance / 100
    },
    getPortfolio () {
      var portfolio = this.storageGetObject('portfolio')
      if (!portfolio) {
        portfolio = []
        this.storageSetObject('portfolio', JSON.stringify(portfolio))
      }
      console.log(portfolio)
      return JSON.parse(portfolio)
    },
    saveBalance (newBalance) {
      window.localStorage.setItem('balance', newBalance)
    },
    savePortfolio (portfolio) {
      this.storageSetObject('portfolio', JSON.stringify(portfolio))
    },
    storageSetObject (key, obj) {
      return window.localStorage.setItem(key, JSON.stringify(obj))
    },
    storageGetObject (key) {
      return JSON.parse(window.localStorage.getItem(key))
    },
    findStock (symbol) {
      var url = `http://data.benzinga.com/rest/richquoteDelayed?symbols=${symbol.toUpperCase()}`
      return new Promise((resolve, reject) => {
        Vue.http.jsonp(url).then((res) => {
          console.log(JSON.parse(res.bodyText))
          var body = res.body
          if (body.null) {
            reject(body.null.error.message)
          } else {
            resolve(res.body)
          }
        })
      })
    }
  }
}
