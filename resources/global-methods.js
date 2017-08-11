var router = require('express').Router();


function authenticate(req,res,next) {
    if (req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
}


module.exports = {
    authenticate
}