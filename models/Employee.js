/**
 * Created by john.nana on 5/16/2016.
 */

var rekuire = require("rekuire"),
    mongoose = rekuire("database"),
    crypto = require("crypto"),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;


var EmployeeSchema = new Schema({
    fname: String,
    lname:String,
    email:{type: String, required: true, index: { unique: true }},
    passwdhash: String,
    salt: { type: String, required: true, default: uuid.v1 },
    dob: Date,
    phone:String,
    address: String,
    state: String,
    job_title: String,
    manager: String,
    leave_approval: [String],
    g_salary:Number,
    basic_salary:Number,
    housing:Number,
    transport:Number,
    other:[Schema.Types.Mixed],
    role:[String],
    company:{type: Schema.Types.ObjectId, ref:'Company'}



});


var hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};

EmployeeSchema.methods.setPassword = function(passwordString) {
    this.passwdhash = hash(passwordString, this.salt);
};
EmployeeSchema.methods.isValidPassword = function(passwordString) {
    var w = hash(passwordString, this.salt);
    //return w;
    return this.passwdhash === hash(passwordString, this.salt);
};



module.exports = mongoose.model('Employee', EmployeeSchema);