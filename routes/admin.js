// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('admin', { title: 'Admin Page', name : 'Tung' });
// });

// module.exports = router;
var express = require('express');
var router = express.Router();
var tableShop = require('../model/showtable');
var productFromShop = require('../model/getSelectedProduct');
var getNumberShop = require('../model/getNumberShop');


router.get('/findShop', async function (req, res, next) {
   // var tableProduct = await tableShop(1);
   var name = body.req.nameShop;
   let listSelectShop = await getNumberShop();
   var tableProduct = await productFromShop(name);
   res.render('admin', {Title:'Admin',selectBox: listSelectShop, result: tableProduct})
});

module.exports = router;