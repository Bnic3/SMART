/**
 * Created by john.nana on 5/18/2016.
 */

var express = require('express');
var rek = require('rekuire'),
    DB = rek('database');


var router = express.Router();

/* GET users listing. */
router.route("/api/employee/:id")
    .get(getEmployee)
    .post(updateEmployee)
    .delete(removeEmployee);

router.post('/api/employee/create', createEmployee);

router.get('api/company/employees',getCompanyEmployees);


function getEmployee(req, res){
    var Employee = DB.model("Employee");
    var id = req.query.id;

    Employee.find({_id: id}, function(err, emp){
        if (err) {return res.send({success: false, message:"Something went wrong in coy db", notifyType: "error"});}

        if(!emp){ return res.send({success: false, message:"The user does not exist", notifyType: "error"})}
        else if (emp){return res.json(emp)}

    })

}

function updateEmployee(req, res){
    var Employee = DB.model("Employee");
    var data = req.body;

    Employee.update({ _id:data._id }, data, { upsert:true }, function(err, UpdatedEmployee){
        if(err) return res.status(404).json(err);

        return res.json({ error: false, message:'update successful', payload:UpdatedEmployee,status:"OK" });
    });

}

function removeEmployee(req,res){

    var Employee = DB.model("Employee");
    var id = mongoose.Types.ObjectId(req.query.id);

    Employee.remove({_id : id}, function(err, User){
        if(err) return res.status(404).json(err);

        return res.send({success: true, message:"Employee deleted successfully", notifyType: "success"});
    });
}

function createEmployee(req, res){
    var Employee = DB.model("Employee");
    var data = req.body;

    var emp = new Employee({
        fname:data.fname,
        lname:data.lname,
        email:data.email,
        dob: data.dob,
        phone:data.phone,
        address: data.address,
        state: data.state,
        job_title: data.title,
        manager: data.manager,
        g_salary:data.g_salary,
        basic_salary:data.b_salary,
        housing:data.housing,
        transport:data.transport,
       company:data.company
    });
    emp.role.push('user');
    emp.setPassword("defaultsecret");

   /* other:[Schema.Types.Mixed],role:[String],*/
    emp.save(function(err, result) {
        if (err) return res.send({success: false, message:"Something went wrong in emp db", notifyType: "error"});

        return res.send({success: true, message:"Company and admin account has been created", notifyType: "success"});

    });



} //endCreateEmployee

function getCompanyEmployees(req,res){

    var Employee = DB.model("Employee");
    var id = req.query.id;

    var q = Employee.find({company: id}).exec();

    q.then(function(results){
        res.json(results);
    });


}


module.exports = router;

