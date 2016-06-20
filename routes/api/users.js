"use strict";

var express = require('express')
var rek = require("rekuire");


var DB= rek("database");

var router = express.Router();
var user = DB.model('User');


/* GET users listing. */
router.get('/user', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/api/user')
    .post(createUser)
    .get(getUser);


function createUser(req, res) {

  var input = req.body;

  var User = new user({username: input.username});
  var psw = input.password;
  User.role.push(input.role);
  User.setPassword(psw);

  User.save(function (err, result) {
    if (err) return res.json(err, 404);
    return res.json(result);
  });
} //end create

function getUser(req,res){
  user.find({}, function(err, docs){
    if (err) return res.json(err, 404);

    return res.json(docs)
  });
}

module.exports = router;
