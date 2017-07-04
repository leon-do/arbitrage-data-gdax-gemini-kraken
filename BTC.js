'use strict'

const Request = require('request')
const fs = require('fs')


var getGeminiPrice = () => {
  return new Promise((resolve, reject) => {
    const geminiData = {};

    Request({
      method: 'GET',
      url: `https://api.gemini.com/v1/pubticker/btcusd`,
      headers: {
        'user-agent': 'request'
      }
    }, (error, response, body) => {
      const data = JSON.parse(body)
      resolve(data.last)
    })
  })    
}


var getGdaxPrice = () => {
  return new Promise((resolve, reject) => {
    Request({
      method: 'GET',
      url: `https://api.gdax.com/products/btc-usd/ticker`,
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
          uri: `https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD`
      }, (error, response, body) => {
          const data = JSON.parse(body)
          resolve(data.result.XXBTZUSD.c[0])
      })
    })
}


setInterval(() => {

  Promise.all([getGeminiPrice(), getGdaxPrice(), getKrakenPrice()])
    .then(response => {
      fs.appendFile('BTC.csv', `${new Date()}, ${response} \n`, (err) => {if (err) throw err;});
    })

}, 5000)


