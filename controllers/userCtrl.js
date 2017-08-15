var router = require('express').Router();
var request = require('request');
var User = require('./../models/user');

function updatePrefs(req,res) {
    console.log('hitting path')
    User.findById(req.user.id, function(err, user) {
        console.log(req.user.id)
        user.preferences.age = req.body.age;
        user.preferences.size = req.body.size;
        user.preferences.species = req.body.animal;
        user.save();
    res.render('welcome', {user:user})
    });
}

function show(req, res) {
    User.findById(req.user.id, function(err, user) {
        res.render('users/show', {user})
    }) 
}

module.exports = {
    updatePrefs,
    show
}