var router = require('express').Router();
var request = require('request');
var User = require('./../models/user');
var Pet = require('./../models/favpet');

function updatePrefs(req,res) {
    var showNavbar = true;
    User.findById(req.user.id, function(err, user) {
        user.preferences.age = req.body.age;
        user.preferences.size = req.body.size;
        user.preferences.species = req.body.animal;
        user.preferences.zipcode = req.body.zip;
        user.save();
    res.render('welcome', {user:req.user, showNavbar})
    });
}
function updatePrefs2(req,res) {
    var showNavbar = true;
    User.populate(req.user, 'favPets', function(err, user) {
        user.preferences.age = req.body.age;
        user.preferences.size = req.body.size;
        user.preferences.species = req.body.animal;
        user.preferences.zipcode = req.body.zip;
        user.save( function(err) {
            res.render('profile', {user, showNavbar});
        });
    });
}

function profile(req, res) {
    var showNavbar = false;
    User.populate(req.user, 'favPets', function(err, user) {
        res.render('profile', {user, showNavbar})
    }); 
}

function welcome(req,res) {
    var showNavbar = true;
    res.render('welcome', {user:req.user, title: 'Adopted', showNavbar })};

module.exports = {
    updatePrefs,
    updatePrefs2,
    profile,
    welcome
}







