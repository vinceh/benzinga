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
      return Math.round((balance / 100), -2)
    },
    getPortfolio () {
      var portfolio = this.storageGetObject('portfolio')
      if (!portfolio) {
        portfolio = []
        this.storageSetObject('portfolio', portfolio)
      }
      return portfolio
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
        Vue.http.get(url).then((res) => {
          console.log(res)
        })
      })
    }
  }
}
