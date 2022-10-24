var express = require('express');
var router = express.Router();
var tableShop = require('../model/showtable');
var productFromShop = require('../model/getSelectedProduct');
var getNumberShop = require('../model/getNumberShop');


router.post('/', async function (req, res, next) {
   // var tableProduct = await tableShop(1);
  let name = req.body.shop;
   console.log(name);
   let listSelectShop = await getNumberShop();
   var tableProduct = await productFromShop(name);
   res.render('admin', {Title:'Admin',selectBox: listSelectShop, result: tableProduct})
});

module.exports = router;