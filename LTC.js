'use strict'

const Request = require('request')
const fs = require('fs')


var getGdaxPrice = () => {
  return new Promise((resolve, reject) => {
    Request({
      method: 'GET',
      url: `https://api.gdax.com/products/ltc-usd/ticker`,
      headers: {
        'user-agent': 'request'
      }
    }, (error, response, body) => {
      const data = JSON.parse(body)
      resolve(data.price)
    }) 
  })
}


var getKrakenPrice = () => {
    return new Promise((resolve, reject) => {
      Request({
          uri: `https://api.kraken.com/0/public/Ticker?pair=XLTCZUSD`
      }, (error, response, body) => {
          const data = JSON.parse(body)
          resolve(data.result.XLTCZUSD.c[0])
      })
    })
}


setInterval(() => {

  Promise.all([getGdaxPrice(), getKrakenPrice()])
    .then(response => {
      fs.appendFile('LTC.csv', `${new Date()}, ${response} \n`, (err) => {if (err) throw err;});
    })

}, 5000)


