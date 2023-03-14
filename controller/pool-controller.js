const mobil = require('./mobil-v2')
const owner = require('./owner')
const axios = require('./axios')
const controller = {}

controller.mobil = mobil
controller.owner = owner
controller.axios = axios

module.exports = controller