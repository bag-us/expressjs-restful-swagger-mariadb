const model = require('../config/model/pool-model')
const controller = {}

controller.getAll = async function(req,res){
    try{
        const value = await model.mobil.findAll()
        if (value.length > 0) {
            res.status(200).json({
                message: "Get All Data",
                data: value
            })
        }else{
            res.status(404).json({
                message: "Data Not Found",
                data: []
            })
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

controller.getOne = async function (req,res){
    try{
        let value = await model.mobil.findAll({
            where:{
                id: req.params.id
            }
        })
        if (value.length > 0) {
            res.status(200).json({
                message: "Mobil has found",
                data: value
            })
        }else{
            res.status(404).json({
                message: "Data Not Found",
                data: []
            })
        }
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

controller.post = async function (req,res){
    try{
        let value = await model.mobil.create({
            brand: req.body.brand,
            type: req.body.type
        })
        res.status(201).json({
            message: "Success insert data",
            data: value
        })        
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

controller.put = async function (req,res){
    try{
        let value = await model.mobil.update({
            brand: req.body.brand,
            type: req.body.type
        },{
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Success update data",
            rowsAffected: value[0] // mengambil jumlah baris yang di-update
        })        
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

controller.deleteData = async function (req,res){
    try{
        await model.mobil.destroy({
            where:{
                id: req.params.id
            }
        })
        res.status(200).json({
            message: "Success delete data"
        })        
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = controller