/**
 * Created by john.nana on 5/18/2016.
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/employee', function(req, res) {
    res.send('respond with a resource');
});

module.exports = router;

