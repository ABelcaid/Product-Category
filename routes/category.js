const express = require('express');
const Router = express.Router();
const db = require("../dbconnection");


// ================================= show all category ================================


Router.get('/', (req, res) => {
    const sql = "SELECT * from category";
    db.query(sql, (err, rows) => {
        console.log(rows);
        if (err) throw err;
        res.render('category', {
            title: 'E-com Relation',
            rows: rows
        });

    })

});



// ================================= add category ================================


Router.get('/addCategory', (req, res) => {

    res.render('addCategory', {
        title: 'Add Category',

    });

});

Router.post("/addCategory", (req, res) => {

    let category_name = req.body.name_c;

    let query = "INSERT INTO `category` (name_c) VALUES ('" + category_name + "')";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    res.render('addCategory');
});


// ================================= edit category ================================

Router.get("/editCategory/:idCategory", (req, res) => {

    let idCategory = req.params.idCategory;
    let sql = `Select * from category where idc = ${idCategory}`;
    let query = db.query(sql, (err, result) => {
        if (err) throw err;
        res.render('editCategory', {
            idc: idCategory,
            row: result[0]
        });
    });
});

Router.post("/editCategory/:idCategory", (req, res) => {

    let idCategory = req.params.idCategory;
    let name = req.body.name_c;


    let query = "UPDATE `category` SET `name_c` = '" + name + "' WHERE `category`.`idc` = '" + idCategory + "'";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/category');
    });

});

// ================================= delete category ================================


Router.get("/deleteCategory/:idCategory", (req, res) => {

    let idCategory = req.params.idCategory;

    let query = 'DELETE FROM category WHERE idc = "' + idCategory + '"';

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/category');
    });

});

module.exports = Router;