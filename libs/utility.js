/**
 * Created by john.nana on 4/18/2015.
 */

var cheerio = require('cheerio'),
    rek = require("rekuire"),
    fs= require("fs"),
    DB= rek("database"),
    Q = require("q");
_ = require("lodash");



var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
];




function excessBill(a){
    var bill = a.bill;
    var max = a.maxbill;
    var xss= 0;
    a.bill = parseInt(bill.split(',').join(''));

    if(a.bill > a.maxbill){
        xss = a.bill - a.maxbill;
        return xss;
    }

    return xss;
}

exports.billParser= function(req,res,next){

    fs.readFile("./uploads/bill.html",function(err,data){
        if (err) res.json({error: true, message: "cant read file"}, 404);


        var html= data.toString();

        // get delimiter
        var a = html.indexOf("Direct number")
        var b = a-7;
        var delimeter = "."+html.slice(b,a-2);

        $ = cheerio.load(html);

        //test
        var directNumber = $(delimeter).parentsUntil('BODY').next('DIV').text().substr(0,9);
        //var test2 = html.indexOf(directNumber);
        var c = html.indexOf("class", a);
        var  delimeterClass = html.substr(c+7,5);


        $(delimeter).addClass(delimeterClass).text("x");

        var r = $("."+delimeterClass).text();
        var str = r.split('x')
            .filter(function(item){ return item !== "";})
            .map(function(record){
                var number = record.substr(0,9);
                var bill = record.substr(9);
                return{
                    phone:number,
                    bill:bill
                }
            });


        var tmp= str[str.length-1].bill;

        var tmp2= tmp.indexOf('.')+3;
        var lastbill= tmp.substring(0,tmp2);
        str[str.length-1].bill=lastbill
        console.log(str);
        //console.log
        var  total = tmp.substr(tmp2, tmp.length-1);

        req.xtract={};
        req.xtract.invoice = str;
        req.xtract.total= total;
        next();


        //query the database
      //  dbxtract(str);
        //console.log(bill);

    });
}

exports.dbxtractMapper = function(req,res,next){

    var date = new Date();
    var mi;

    var monthIndex = date.getMonth();
    if( monthIndex == 0 ){
        mi = 11
    }
    else{ mi = date.getMonth()-1 ; }

    var billmonth = monthNames[mi];






    var Employee= DB.model("Employee");
    var str = req.xtract.invoice;

    //.select('_id first_name last_name phone email')

    var q = Employee.find({}).exec();
    q.then(function(results){
        var users = _.map(results, function(user){
            return user.toObject();
        }).map(function(user){

            user.month = billmonth;
           // user.phone = "01270"+user.phone;

            var bill = _.find(str,{phone:user.phone});
            if(bill){
                var invoice = _.merge(bill, user);
                invoice.excess= excessBill(invoice);
                return invoice;
            }
            return null
        });
       // console.log(users);
        req.xtract.users=users;
        next();
        // return users
    });


}// end DbXtract

exports.unknownUsers = function(req, res, next){

    var allNumbers = req.xtract.invoice;
    var knownNumbers = req.xtract.users;

   var reject = _.reject(allNumbers,{bill:"0.00"});
    //console.log(reject);

    var allPluck = _.map( reject,'phone');
    //console.log(allPluck);
    console.log("filter break");
    var knownPluck = _.map(knownNumbers, "phone").filter((value)=> !_.isUndefined(value));
    console.log(knownPluck);
    console.log("known break");
    req.xtract.unknownPluck= _.difference(allPluck,knownPluck);
    console.log(req.xtract.unknownPluck);


    next();



} //end unknownusers

exports.processInvoice= function(invoices){

    var date = new Date();

    var Invoice = DB.model('Invoice');
    var refinedInvoices= _.map(invoices, function(item){
        var itemObj= {  employee:item._id,
                        phone:item.phone,
                        bill:item.bill,
                        month:item.month,
                        year: date.getFullYear(),
                        excess:item.excess
                    }
        var transform =  new Invoice(itemObj);
        return transform;
    })
        .forEach(function(item){
            item.save(function(err, data){
                if(err){console.log("couldn't insert the documents")}
                else{console.info(" invoice processed successfully");}
            })
        });


}
