var express = require('express');
var passport = require("passport");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ESS', function(req, res, next) {
  res.render('spa', { title: 'SMART' });
});


router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),function(req,res){
  console.log(req.user);
  var me = req;
  req.logIn(req.user, function (err){
    if(err) {console.log("login Error")}

    console.log("<<break>>");
    console.log(req.session);
    res.send({sucess: true, user: req.user});
  });
 /* console.log(req)*/




});
router.get('/logout', function(req,res){req.logOut();
          res.send()})

module.exports = router;
