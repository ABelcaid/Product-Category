const express = require('express');
const Router = express.Router();
const db = require("../dbconnection");



// ================================= add Product  ================================


Router.get('/addProduct',(req, res) => {

    let sql = "SELECT * FROM category";
  db.query(sql, (err, rows) => {
      if(err) throw err;
      res.render('addProduct', {
         
          rows : rows
      });

  });
  
  });

Router.post("/addProduct", (req, res) => {

    let product_name = req.body.name;
    let product_price = req.body.price;
    let product_category = req.body.id_spct;



    // let query = "INSERT INTO `category` (name_c) VALUES ('" + category_name + "')";

    let query = "INSERT INTO `product` (name_p, price, category) VALUES ('" +product_name + "', '" + product_price + "', '" + product_category + "')";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
    });
    res.redirect('/');

});


// ================================= edit category ================================

Router.get("/editProduct/:idProduct", (req, res) => {
    
    let idProduct = req.params.idProduct;

    let sql = "SELECT * FROM category";
    db.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('editProduct', {
            idp : idProduct,
            rows : rows
        });
  
    });
    

    // res.render('editProduct', {
    //     idp : idProduct,
  
    // });
});

Router.post("/editProduct/:idProduct", (req, res) => {

    let idProduct = req.params.idProduct;
   
    let product_name = req.body.name;
    let product_price = req.body.price;
    let product_category = req.body.id_spct;


    // let query = "UPDATE `category` SET `name_c` = '" + name + "' WHERE `category`.`idc` = '" + idCategory + "'";

    let query = "UPDATE `product` SET `name_p` = '" + product_name + "', `price` = '" + product_price + "', `category` = '" + product_category + "'";

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });

});

// ================================= delete category ================================


Router.get("/deleteProduct/:idProduct", (req, res) => {

    let idProduct = req.params.idProduct;
   
    let query = 'DELETE FROM product WHERE idp = "' + idProduct + '"';

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.redirect('/');
    });

});

module.exports = Router;