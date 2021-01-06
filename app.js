const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const  ejs = require('ejs');

const app = express()
const port = 3000

// database connection 
const db = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product-category'
});

// connect to database
db.connect((err) => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});
global.db = db;


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

//------------------------------------ (Product) ----------------------------------//

app.get('/add-product',(req, res) => {
  let sql = "SELECT * FROM category";
  db.query(sql, (err, rows) => {
      if(err) throw err;
      res.render('addProduct', {
          title : 'Add Product',
          rows : rows
      });

  });
  });


//------------------------------------ (Categorie) ----------------------------------//

app.get('/add-category',(req, res) => {

  res.render('addCategory', {
      title : 'Add Product',

  });

});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})