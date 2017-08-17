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
    User.populate(req.user, 'favPets',function(err, user) {
        request(options.url, function(err,response,body) {
            var showNavbar = true;
            let doc = JSON.parse(body);
            var petArray = [];
            user.favPets.forEach( (animal) => {
                petArray.push(animal.petfinderId)
            })
            console.log(petArray)

            res.render('results', {doc, showNavbar, user, petArray});
        });

    })
}

            // console.log(Object.keys(doc.petfinder))
function show(req,res,next) {
     var options = {
        url: `${basePath}pet.get?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&id=${req.params.id}`,
        method: 'GET'
    };
    request(options.url, function(err,response,body) {
        var showNavbar = false;
        let doc = JSON.parse(body);
        res.render('showpet', {doc, showNavbar, user:req.user});
    });
}


function showFavPet(req,res) {
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

module.exports = {
    search,
    show,
    showFavPet
}
