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
    request(options.url, function(err,response,body) {
        var showNavbar = true;
        let doc = JSON.parse(body);
        // console.log(Object.keys(doc.petfinder))
        console.log(req.user);
        res.render('results', {doc, showNavbar, user:req.user});
    });
}

function show(req,res,next) {
     var options = {
        url: `${basePath}pet.get?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&id=${req.params.id}`,
        method: 'GET'
    };
    // console.log(options.url)
    request(options.url, function(err,response,body) {
        var showNavbar = false;
        let doc = JSON.parse(body);
        res.render('showpet', {doc, showNavbar, user:req.user});
    });
}


//show all users favorites
function showFavorites(req, res) {
  User.findById(req.params.id).populate('favpets').exec((err, pets) => {
    res.render('myfavorites', {pets});
  });
}



    // fetch pet id and add to users favorite 

    // retrieve pet id from api and add to users favorite. 



module.exports = {
    search,
    show,
    showFavorites
}