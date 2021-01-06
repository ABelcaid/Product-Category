const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const  ejs = require('ejs');

const app = express()
const port = 3000

// database connection 
const db = require("./dbconnection");

const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");



// configure middleware
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
const publicDirectory = path.join(__dirname, './public');
app.use(express.static(path.join(__dirname, 'public', 'dashboard','css')));
app.use(express.static(path.join(__dirname, 'public', 'dashboard','img')));
app.use(express.static(path.join(__dirname, 'public', 'dashboard','lib')));
app.use(express.static(publicDirectory));


//------------------------------------ Routes Parts ----------------------------------//
app.use("/category",categoryRoutes);
app.use("/product",productRoutes);
//------------------------------------ (HomeRoute) ----------------------------------//



app.get('/', (req, res) => {
  const sql = "SELECT * FROM product INNER JOIN category WHERE product.category = category.idc";
     db.query(sql, (err, rows) => {
      console.log(rows);
         if (err) throw err;
         res.render('index', {
          title : 'E-com Relation',
             rows: rows
         });
 
     })
 
 });






app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})