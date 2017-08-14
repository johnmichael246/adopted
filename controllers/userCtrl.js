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
    let header = new Header({
    'Access-Control-Allow-Origin':'*'
    });
    var options = {
        url: basePath + '&key=' + process.env.PETFINDER_KEY + 'pet.get?format=json&id=' + id,
        headers: header,
        mode: 'cors',
        method: 'GET'
    };
    request(options, function(err,response,body) {
        console.log('body')
        let pet = JSON.parse(body);
        res.render('search', {pet});
    });
}

module.exports = {
    updatePrefs,
    search,
}