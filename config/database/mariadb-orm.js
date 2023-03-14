const Sequelize = require('sequelize');

// Setting up database (MariaDB) connection
var db = new Sequelize('dealer', 'root', '123', {
    dialect: 'mariadb',
    host: 'localhost'
  })

module.exports = db