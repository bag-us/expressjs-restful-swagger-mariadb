const express = require('express');
const router = express.Router();
const pool = require('../database/config/mariadb');

//http://localhost:6060/mobil
router.get('/',(req, res, next) => {
    async function asyncFunction() {
        let conn;
        try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM mobil")
        res.status(200).json({
            message:"Get method mobil",
            data: rows
            })
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error fetching data from database",
                error: err
            });
        }
        finally {
        if (conn) conn.release(); //release to pool
        }
    }
    asyncFunction()
})

router.post('/',(req, res, next) => {
    const brand = req.body.brand
    const type = req.body.type

    async function asyncFunction() {
        let conn;
        try {
        conn = await pool.getConnection();
        const rows = await conn.query(`INSERT INTO mobil (brand, type) VALUES ('${brand}', '${type}')`)
        res.status(201).json({
            message:"Success insert data"
            })
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error insert data from database",
                error: err
            });
        }
        finally {
        if (conn) conn.release(); //release to pool
        }
    }
    asyncFunction()
})

// http://localhost:6060/mobil/1111
router.get('/:id',(req, res, next) => {
    const id = req.params.id
    async function asyncFunction() {
        let conn;
        try {
        conn = await pool.getConnection();
        const rows = await conn.query(`SELECT * FROM mobil WHERE id=${id}`)
        res.status(200).json({
            message:"Get method mobil by id",
            data: rows
            })
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error fetching data from database",
                error: err
            });
        }
        finally {
        if (conn) conn.release(); //release to pool
        }
    }
    asyncFunction()
})

router.delete('/:id',(req, res, next) => {
    const id = req.params.id
    async function asyncFunction() {
        let conn;
        try {
        conn = await pool.getConnection();
        const rows = await conn.query(`DELETE FROM mobil WHERE id=${id}`)
        res.status(200).json({
            message:"Data has been deleted by id"
            })
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error fetching data from database",
                error: err
            });
        }
        finally {
        if (conn) conn.release(); //release to pool
        }
    }
    asyncFunction()
})

router.put('/:id',(req, res, next) => {
    const id = req.params.id
    const brand = req.body.brand
    const type = req.body.type

    async function asyncFunction() {
        let conn;
        try {
        conn = await pool.getConnection();
        const rows = await conn.query(`UPDATE mobil SET brand = '${brand}', type = '${type}' WHERE id=${id}`)
        res.status(201).json({
            message:"Success update data"
            })
        } 
        catch (err) {
            console.error(err);
            res.status(500).json({
                message: "Error insert data from database",
                error: err
            });
        }
        finally {
        if (conn) conn.release(); //release to pool
        }
    }
    asyncFunction()
})

module.exports = router;