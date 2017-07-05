'use strict'

const Request = require('request')
const fs = require('fs')


var getGeminiPriceETH = () => {
  return new Promise((resolve, reject) => {
    const geminiData = {};

    Request({
      method: 'GET',
      url: `https://api.gemini.com/v1/pubticker/ethusd`,
      headers: {
        'user-agent': 'request'
      }
    }, (error, response, body) => {
      const data = JSON.parse(body)
      resolve(data.last)
    })
  })    
}


var getGdaxPriceETH = () => {
  return new Promise((resolve, reject) => {
    Request({
      method: 'GET',
      url: `https://api.gdax.com/products/eth-usd/ticker`,
      headers: {
        'user-agent': 'request'
      }
    }, (error, response, body) => {
      const data = JSON.parse(body)
      resolve(data.price)
    }) 
  })
}


var getKrakenPriceETH = () => {
    return new Promise((resolve, reject) => {
      Request({
          uri: `https://api.kraken.com/0/public/Ticker?pair=XETHZUSD`
      }, (error, response, body) => {
          const data = JSON.parse(body)
          resolve(data.result.XETHZUSD.c[0])
      })
    })
}


setInterval(() => {

  Promise.all([getGeminiPriceETH(), getGdaxPriceETH(), getKrakenPriceETH()])
    .then(response => {
      fs.appendFile('ETH.csv', `${new Date()}, ${response} \n`, (err) => {if (err) throw err;});
    })

}, 5000)


