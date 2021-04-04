

var mysql = require('mysql');

module.exports = {
  port: process.env.PORT || 3002,
  env: process.env.NODE_ENV || 'development',
  mediane: 6,

  pool: mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'todolist',
    debug: false
  }),
   
  

};

