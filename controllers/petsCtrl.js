var router = require('express').Router();
var request = require('request');
var User = require('./../models/user');
var Pet = require('./../models/favpet');
const basePath = "http://api.petfinder.com/"

function search(req,res,next) {
        console.log(req.body)
    var options = {
        url: `${basePath}pet.find?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&size=${req.body.size}&age=${req.body.age}&animal=${req.body.animal}&location=${req.body.zip}&count=27`,
        method: 'GET'
    };
    console.log(options.url)
    request(options.url, function(err,response,body) {
        console.log('+++++++++++++++++++++')
        let doc = JSON.parse(body);
        // console.log(Object.keys(doc.petfinder))
        res.render('results', {doc});
    });
}
function show(req,res,next) {
     var options = {
        url: `${basePath}pet.get?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&id=${req.params.id}`,
        method: 'GET'
    };
    // console.log(options.url)
    request(options.url, function(err,response,body) {
        let doc = JSON.parse(body);
        res.render('showpet', {doc});
    });
}

// function getFavorite() {
//   User.findById(req.user.id), function(err, user) {
//       Pet.findById
//   }
// }






module.exports = {
    search,
    show
}