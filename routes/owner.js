const express = require('express');
const router = express.Router();
const controller = require('../controller/pool-controller')

router.get('/', controller.owner.getAll)

router.post('/', controller.owner.post)
// Request body must an array object :
// [
//     {
//         "name_brand": "Toyota",
//         "name": "Fujimoto"
//     },
//     {
//         "name_brand": "Tesla",
//         "name": "Elon Musk"
//     }
// ]

router.delete('/', controller.owner.delete)
// Request body must an object :
// {
//     "name_brand": ["Toyota","Tesla"]
// }

router.get('/page', controller.owner.getPage)
// add params
// /owner/page?page=1&record=4

module.exports = router