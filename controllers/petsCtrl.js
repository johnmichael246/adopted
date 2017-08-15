var router = require('express').Router();
var request = require('request');
require('./../models/user');
require('./../models/favpet');
const basePath = "http://api.petfinder.com/"

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
        // let name = doc.petfinder.pets.pet.name;
        console.log('+++++++++++++++++++++')
        console.log(doc.petfinder.pets)
        console.log('+++++++++++++++++++++')
        // JSON.stringify(pet)
        // console.log(pet)
        res.render('results', {doc});
    });
}

function show(req,res,next) {

}

module.exports = {
    search,
    show
}