const Sequelize = require('sequelize');
const db = require('../database/mariadb-orm');

const owner = db.define('owner',{
    name_brand: Sequelize.STRING,
    name: Sequelize.STRING
},{
    freezeTableName: true,  // agar tidak mencari tabel owners
    timestamps: false        // belum ada kolom createdAt & upudatedAt
})

owner.removeAttribute('id'); // tidak ada id di table owner
module.exports = owner;