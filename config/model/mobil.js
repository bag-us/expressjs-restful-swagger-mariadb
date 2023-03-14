const Sequelize = require('sequelize');
const db = require('../database/mariadb-orm');
const owner = require('./owner');

const mobil = db.define('mobil',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
    brand: Sequelize.STRING,
    type: Sequelize.STRING,
    photo: Sequelize.STRING
},{
    freezeTableName: true,  // agar tidak mencari tabel mobils
    timestamps: false        // belum ada kolom createdAt & upudatedAt
})

mobil.hasOne(owner, { foreignKey: 'name_brand', sourceKey: 'brand' })
owner.belongsTo(mobil, { foreignKey: 'name_brand' })


module.exports = mobil;