var router = require('express').Router();
var request = require('request');
require('./../models/user');
const basePath = "http://api.petfinder.com/"

function updatePrefs(req,res) {
    User.findByIdAndUpdate(req.params.id, function(err, user) {
        User.update(req.params.id, req.body, function(err,user) {

        })
    res.render('/home', {user:user})
    });
}



module.exports = {
    updatePrefs,
}