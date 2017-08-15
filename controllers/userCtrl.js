var router = require('express').Router();
var request = require('request');
require('./../models/user');
const basePath = "http://api.petfinder.com/"

function updatePrefs(req,res) {
    User.findByIdAndUpdate(req.params.id, function(err, user) {
        user.preferences.age = req.body.age
        user.preferences.size = req.body.size
        user.preferences.species = req.body.animal
    res.render('/home', {user:user})
    });
}



module.exports = {
    updatePrefs,
}