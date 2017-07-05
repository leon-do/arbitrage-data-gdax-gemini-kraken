'use strict'

const Request = require('request')
const fs = require('fs')
var mysql      = require('mysql');




// Load the http module to create an http server.
const http = require('http');
// Configure our HTTP server to respond with Hello World to all requests.
const server = http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
// Last, but not least, listen on port 8080
// The environment variable PORT is automatically defined and equals to 8080
server.listen(process.env.PORT, '0.0.0.0');




var connection = mysql.createConnection({
  host     : 'mysql4.gear.host',
  port     : '3306',
  user     : 'ldogearhostt',
  password : 'Kc0U9?-Y4S7Q',
  database : 'ldogearhostt'
});
 
connection.connect();



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



var getGeminiPriceBTC = () => {
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


var getGdaxPriceBTC = () => {
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


var getKrakenPriceBTC = () => {
    return new Promise((resolve, reject) => {
      Request({
          uri: `https://api.kraken.com/0/public/Ticker?pair=XXBTZUSD`
      }, (error, response, body) => {
          const data = JSON.parse(body)
          resolve(data.result.XXBTZUSD.c[0])
      })
    })
}



var getGdaxPriceLTC = () => {
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


var getKrakenPriceLTC = () => {
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

  Promise.all([getGdaxPriceLTC(), getKrakenPriceLTC()])
    .then(response => {
      connection.query("INSERT INTO ltc (gdax, kraken, date) VALUES (?, ?, ?)",[response[0], response[1], new Date()], (error, results, fields) => {
        if (error) throw error;
      });    })

}, 60000)




setInterval(() => {

  Promise.all([getGeminiPriceBTC(), getGdaxPriceBTC(), getKrakenPriceBTC()])
    .then(response => {
      connection.query("INSERT INTO btc (gemini, gdax, kraken, date) VALUES (?, ?, ?, ?)",[response[0], response[1], response[2], new Date()], (error, results, fields) => {
        if (error) throw error;
      });    })

}, 60000)





setInterval(() => {

  Promise.all([getGeminiPriceETH(), getGdaxPriceETH(), getKrakenPriceETH()])
    .then(response => {
      connection.query("INSERT INTO eth (gemini, gdax, kraken, date) VALUES (?, ?, ?, ?)",[response[0], response[1], response[2], new Date()], (error, results, fields) => {
        if (error) throw error;
      });
    })

}, 60000)


