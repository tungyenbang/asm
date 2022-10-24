var express = require('express');
var router = express.Router();
// var pg_conn = require('./database');
var authen = require('../model/authenticate');

router.get('/', function(req, res, next) {
    res.render('../views/login.ejs');
});


// router.post('/login', async function(req, res, next){
//     var user = req.body.username;
//     var pass = req.body.password;
//     let authenticated = await authen(username, password);
//     if(authenticated == true){
//         res.render('home');
//     }else{
//         res.render('login', {notice: "wrong username or password"});
//     } 
// });

module.exports = router;