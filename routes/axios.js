const express = require('express');
const router = express.Router();
const controller = require('../controller/pool-controller')

router.get('/', controller.axios.getAll)
router.post('/', controller.axios.post)
router.put('/', controller.axios.put)
router.delete('/', controller.axios.delete)

module.exports = router