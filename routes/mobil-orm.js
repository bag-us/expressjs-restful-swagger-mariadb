const express = require('express');
const router = express.Router();
const controller = require('../controller/pool-controller')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './assets')
    },
    filename: function(req, file, callback){
        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}_${file.originalname}`;
        callback(null, uniqueFilename)
    }
})
const upload = multer({storage: storage})

//http://localhost:6060/mobil
router.get('/', controller.mobil.getAll)
router.post('/',upload.single('photo'), controller.mobil.post)

// http://localhost:6060/mobil/search?keyword=
router.get('/search', controller.mobil.getSearch)

// http://localhost:6060/mobil/1111
router.get('/:id', controller.mobil.getOne)
router.delete('/:id',controller.mobil.deleteData)
router.put('/:id',upload.single('photo'),controller.mobil.put)


module.exports = router;