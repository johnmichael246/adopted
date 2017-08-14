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

function search(req,res,next) {
    var options = {
        url: basePath + 'pet.get?'+ '&key=' + process.env.PETFINDER_KEY + '&secret=' + process.env.PETFINDER_SECRET + '&format=json' + '&id=38860268',
        header: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type':'application-json'
        },
        mode: 'cors',
        method: 'GET'
    };
    request(options, function(err,response,body) {
        console.log(body)
        console.log('+++++++++++++++++++++')
        let pet = JSON.parse(body);
        console.log('+++++++++++++++++++++')
        console.log(pet)
        console.log('+++++++++++++++++++++')
        console.log(pet.pet.options)
        res.render('search', {pet});
    });
}

module.exports = {
    updatePrefs,
    search,
}