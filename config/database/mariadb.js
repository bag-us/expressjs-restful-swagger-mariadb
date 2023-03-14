const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '123',
  port: '3306',
  database: 'dealer'
})

module.exports = pool
