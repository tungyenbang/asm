var express = require('express');
const app = require('../app');
var router = express.Router();
var authen = require('../model/authenticate');
var product = require('../model/showProduct');
var idshop = require('../model/getIDShop');
var getNumberShop = require('../model/getNumberShop');
var productFromShop = require('../model/getSelectedProduct');
var detailProduct = require('../model/viewDetailProduct');
var deleteP = require('../model/deleteProduct');
var updateP = require('../model/updateProduct');

var productString = ' ';
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Cloud computing class' })});

  router.post('', function (req, res) {
    res.render('login');
});

router.post('/login', async function(req, res, next){
  var username = req.body.username;
  var password = req.body.password;
  let arr = await authen(username, password);
  let viewProduct = await product(arr[1]);
  let role = arr[2];

  let productString = ' ';
  viewProduct.forEach(product => {
    productString += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <form method="POST" action="/button">
            <td><button type="submit" value="update" name="button">Update</button>
            <input type="hidden" value="${product.id}" name="id"></td>
            <input type="hidden" value="${product.shop}" name="shop"></td>
            <td><button type="submit" value="delete" name="button">Delete</button>         
            </form>
        </tr>     
    `
  });
  productString += `
  <form method="POST" action="/gotoAdd">
  <input type="submit">Add</input>
  </form>
  `;
  if(arr[0] == true && role == 'shop'){
      res.render('home',{products: productString});
  }else if(arr[0] == true && role == 'admin'){
       let listSelectShop = await getNumberShop();

       var tableProduct = await productFromShop('all');
    res.render('admin',{selectBox: listSelectShop,result: tableProduct})
  }
  else{
      res.render('login', {notice: "wrong username or password"});
  } 
});

router.post('/button', async function(req, res, next){
  var action = req.body.button;
  console.log(action);
  if(action == "update"){
    var id_product = req.body.id;
    console.log(id_product);
    var detail = await detailProduct(id_product);
    let detail_product_string = `
    <form action="update" method="POST">
  <label for="id">ID:</label>
  <input type="text" id="fname" name="id" value="${detail.id}"><br><br>
  <label for="name">Name product:</label>
  <input type="text" id="lname" name="name" value="${detail.name}"><br><br>
  <label for="price">Price:</label>
  <input type="text" id="fname" name="price" value="${detail.price}"><br><br>
  <label for="quantity">Quantity:</label>
  <input type="text" id="lname" name="quantity" value="${detail.quantity}"><br><br>
  <input type="submit" value="save">
</form>
    `;
    res.render('updateProduct',{product_detail:detail_product_string});
  } else{
    var shop = req.body.shop;
    let viewProduct = await product(shop);
    viewProduct.forEach(product => {
      productString += `
          <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.quantity}</td>
              <form method="POST" action="/button">
              <td><button type="submit" value="update" name="button">Update</button>
              <input type="hidden" value="${product.id}" name="id"></td>
              <td><button type="submit" value="delete" name="button">Delete</button>         
              </form>
          </tr>
          
      `
    })
    var id_product = req.body.id;
     deleteP(id_product);
    res.render('home',{products: productString});
  }
  
});

router.post('/update', async function(req, res, next){
  let idProduct = req.body.id;
  let nameProduct = req.body.name;
  let quantityProduct = req.body.quantity;
  let priceProduct = req.body.price;
  await updateP(idProduct,nameProduct,quantityProduct,priceProduct);

});
router.post('/gotoAdd', async function(req, res, next){
  let detail_product_string = `
  <form action="update" method="POST">
<label for="id">ID:</label>
<input type="text" id="fname" name="id"><br><br>
<label for="name">Name product:</label>
<input type="text" id="lname" name="name"><br><br>
<label for="price">Price:</label>
<input type="text" id="fname" name="price"><br><br>
<label for="quantity">Quantity:</label>
<input type="text" id="lname" name="quantity" ><br><br>
<input type="submit" value="save">
</form>
  `;
  res.render('addProduct',{table: detail_product_string})
});

module.exports = router;