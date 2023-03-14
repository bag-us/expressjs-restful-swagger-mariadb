const model = require('../config/model/pool-model')
const {Op} = require('sequelize') // Operation and, or, between, like
const controller = {}
const fs = require('fs');
const path = require('path');

controller.getAll = async function(req,res){
    try{
        const value = await model.mobil.findAll({
            // menggunakan alias 
            // attributes:[['id','kodeMobil'],['brand','merkMobil'],['type','tipeMobil']],
            include:[
                { 
                    model: model.owner,
                    attributes: ['name']
                }
            ],
            // where:{
                // [Op.and]:
                // [
                //     { brand: 'Honda'},
                //     { type: 'CRV'}
                // ]
                // type: {[Op.or]: ['CRV','Jazz']}
            //     id: {[Op.between]: [1111, 1113]}
            // },
            // order: [['id','desc']],
            // limit:2
        })
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

controller.getSearch = async function (req,res){
    const search = req.query.keyword
    try{
        const value = await model.mobil.findAll({
            // menggunakan alias 
            attributes:[['id','kodeMobil'],['brand','merkMobil'],['type','tipeMobil']],
            where:{
                [Op.or]:
                [
                    {id : {[Op.like] : '%' +search+ '%'}},
                    {type : {[Op.like] : '%' +search+ '%'}}
                ]
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
            type: req.body.type,
            photo: req.file.path
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
        
        // Mengambil data mobil yang akan di-update
        const mobil = await model.mobil.findByPk(req.params.id);

        // Menghapus file photo lama jika ada
        if (mobil.photo) {
            const oldPhoto = path.basename(mobil.photo); 
            fs.unlink(`assets/${oldPhoto}`, (err) => {
                if (err) {
                    console.log(err);
                }else{
                    console.log("success delete old photo")
                }
            });
        }

        let value = await model.mobil.update({
            brand: req.body.brand,
            type: req.body.type,
            photo: req.file.filename
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