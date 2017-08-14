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
        console.log(req.body)
    var options = {
        url: `${basePath}pet.find?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&size=${req.body.size}&age=${req.body.age}&animal=${req.body.animal}&location=${req.body.zip}`,
        method: 'GET'
    };
    console.log(options.url)
    request(options.url, function(err,response,body) {
        console.log('+++++++++++++++++++++')
        let doc = JSON.parse(body);
        console.log(Object.keys(doc.petfinder))
        // let details = doc.petfinder.pets.age;
        // let name = doc.petfinder.pets.name;
        console.log('+++++++++++++++++++++')
        console.log(doc.petfinder.pets)
        console.log('+++++++++++++++++++++')
        // console.log(details)
        // console.log(name)
        console.log('+++++++++++++++++++++')
        // JSON.stringify(pet)
        // console.log(pet)
        res.render('pets', {doc});
    });
}

module.exports = {
    updatePrefs,
    search,
}