var express = require('express');
var router = express.Router();
var pg_conn = require('../model/database');
var product = require('../model/showProduct');


router.get('/', async function(req, res, next) {
    var ButtonString =   `
    <form method = "POST" action="/button">
    `;
 
    let viewProduct = await product(arr[1]);
    var rowResult = getProduct();
    var productString = ' ';
    viewProduct.forEach(product => {
        productString += ButtonString;
      productString += `
          <tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.price}</td>
              <td>${product.quantity}</td>
              <td><button type="submit" value="update" name="button">Update</button></td>
              <td><button type="submit" value="delete" name="button">Delete</button></td>
          </tr>
          </form>
      `
    })
    res.render('home',{products: rowResult});
});

module.exports = router;