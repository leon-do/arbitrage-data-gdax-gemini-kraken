var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'mysql4.gear.host',
  port 	   : '3306',
  user     : 'ldogearhostt',
  password : 'Kc0U9?-Y4S7Q',
  database : 'ldogearhostt'
});
 
connection.connect();
 
connection.query("INSERT INTO eth (gemini, kraken, coinbase, date) VALUES (1, 11, 111, ?)",new Date(), (error, results, fields) => {
  if (error) throw error;
});
 
