/**
 * Created by john.nana on 5/16/2016.
 */

var rekuire = require("rekuire"),
    mongoose = rekuire("database"),
    crypto = require("crypto"),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var PayrollSchema = new Schema({
    employee:{type: Schema.Types.ObjectId, ref:'Employee' } ,
    g_salary:Number,
    basic_salary:Number,
    housing:Number,
    transport:Number,
    c_relief: Number,
    pension: Number,
    vol_pension:Number,
    nhf:Number,
    insurance:Number,
    other:[Schema.Types.Mixed],
    date: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Payroll', PayrollSchema);

