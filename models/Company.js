/**
 * Created by john.nana on 5/18/2016.
 */

var rekuire = require("rekuire"),
    mongoose = rekuire("database"),
    crypto = require("crypto"),
    uuid = require('node-uuid'),
    Schema = mongoose.Schema;

var CompanySchema = new Schema({
    coy_name: {type: String, required: true,  index: { unique: true }},
    sub_start: Date,
    sub_end: Date,
    alias: String,

});


module.exports = mongoose.model('Company', CompanySchema);


