/**
 * Created by john.nana on 6/27/2016.
 */
var express = require('express');
var rek = require('rekuire'),
 DB = rek('database');



var router = express.Router();



/* GET users listing. */
router.route('/company')
    .get(getCompany)
    .post(createCompany)
    .delete(deleteCompany);


router.post('/update/company', function(req, res) {
    res.send('respond with a resource');
});

function getCompany(){
}


function createCompany(req, res){
    var Company = DB.model("Company"),
        Employee = DB.model('Employee');

    var input = req.body;

    //check to see if company exist before saving
    Company.findOne({coy_name:input.company}, function(err, document){
        if(document) {return  res.send({success: false, message:"company already exists", notifyType: "error"});}

        var company = new Company({
            coy_name: input.company,
            alias: input.alias,
            admin_email: input.email,
            admin_contact: input.contact,
            createdOn: Date.now()
        })

        company.save(function(err, doc){
            if (err) {//res.status(404).json(err);
                return res.send({success: false, message:"Something went wrong in coy db", notifyType: "error"});
            }

            var emp = new Employee({
                email:doc.admin_email,
                company: doc._id
            });
            emp.role.push("admin");
            emp.setPassword("defaultsecret");

            //create admin account with default password
            emp.save(function(err, result) {
                if (err) return res.send({success: false, message:"Something went wrong in emp db", notifyType: "error"});

                return res.send({success: true, message:"Company and admin account has been created", notifyType: "success"});

            } );

    })

    }) //end check

}

function deleteCompany(){}




module.exports = router;

