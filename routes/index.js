var express = require('express');
var passport = require("passport");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/ESS', function(req, res, next) {
  res.render('spa', { title: 'SMART', bootstrappedUser: req.user});
});

router.get("/fail", function(req,res){
  res.send({success: false, message:"Username/Password Incorrect", notifyType: "error"})
})


router.post('/login', passport.authenticate('local', { failureRedirect: '/fail' }),function(req,res){
  console.log(req.user);
  var me = req;
  req.logIn(req.user, function (err){
    if(err) {console.log("login Error")}

    console.log("<<break>>");
    console.log(req.session);
    res.send({success: true,message:"Welcome back "+ req.user.username, notifyType: "success", user: req.user});
  });
 /* console.log(req)*/




});
router.get('/logout', function(req,res){req.logOut();
          res.send('u are logged out')})

router.route('/testing')
    .post(function(req,res){ console.log(req.body);res.send("test post")})
    .get(function(req,res){ console.log('test get');res.send("test get"); });

module.exports = router;
