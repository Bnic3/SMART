/**
 * Created by john.nana on 12/19/2014.
 */
var passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("../models/User"),
    config = require("../config");

module.exports = function (app) {
     passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            if (user){ done(err, user);}
            else {done(null, false)}

        });

    });


    // passport/login.js
    passport.use(new LocalStrategy(
        function(username, password, done) {
           User.findOne({ username: username }, function (err, user) {
                if (err) { return done(null, false); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                //var validity= user.isValidPassword(password)
                if (user && user.isValidPassword(password))return done(null,user);
                //if (user && !user.isValidPassword(password))return done(err, false, { message: 'Incorrect password.' });
                return done(null,false );//{ message: 'Incorrect password.' }


            });

        }
    ));
}; //end function
