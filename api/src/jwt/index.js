const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const db = required("../models");

module.exports.isAuthorized  = function(req, res, next) {

    db.User.findOne()
    User.findById(req.session.userId).exec(function (error, user) {
        if (error) {
            return next(error);
        } else {      
            if (user === null) {     
                var err = new Error('Not authorized! Go back!');
                err.status = 401;
                return next(err);
            } else {
                return next();
            }
        }
    });
}