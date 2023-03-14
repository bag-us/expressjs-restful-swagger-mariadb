const model = require('../config/model/pool-model')
const controller = {}

controller.getAll = async function(req,res){
    try{
        const value = await model.owner.findAll()
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

controller.post = async function(req,res){
    try{
        const value = await model.owner.bulkCreate(req.body)
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

controller.delete = async function (req,res){
    try{
        await model.owner.destroy({
            where:{
                name_brand: req.body.name_brand
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

controller.getPage = async function(req,res){
    try{
        let limit = parseInt(req.query.record);
        let page = parseInt(req.query.page);
        let start = 0 + (page - 1) * limit;
        let end = page * limit;
        let value = await model.owner.findAndCountAll({
            limit: limit,
            offset: start
        })

        let countFiltered = value.count; 
        let pagination = {}; 
        pagination.totalRow = value.count; // jumlah data
        pagination.tatalPage = Math.ceil(countFiltered / limit); //di bulatkan
        
        if(end < countFiltered){
            pagination.next = {
                page: page + 1,
                limit
            }
        }
        if(start > 0){
            pagination.prev = {
                page: page - 1,
                limit
            }
        }
        
        res.status(200).json({
            message: "Get All Data",
            pagination,
            data: value.rows
        }) 
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = controller