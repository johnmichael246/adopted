var router = require('express').Router();
var request = require('request');
var User = require('./../models/user');
var Pet = require('./../models/favpet');
const basePath = "http://api.petfinder.com/"


function search(req,res,next) {
    var query = {
        size: req.body.size || data.size,
        age: req.body.age || data.age,
        animal: req.body.animal || data.animal,
        zip: req.body.zip || data.zip,
        offset: req.body.offset || 0
    }

    var options = {
        url: `${basePath}pet.find?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&size=${query.size}&age=${query.age}&animal=${query.animal}&location=${query.zip}&count=25&offset=${query.offset}`,
        method: 'GET'
    };
    User.populate(req.user, 'favPets',function(err, user) {
        request(options.url, function(err,response,body) {
            var showNavbar = true;
            let doc = JSON.parse(body);
            let dog = doc.petfinder.pets.pet
            // console.log('\n\n\n-------')
            // console.log('doc =', doc)
            // console.log(doc.petfinder.lastOffset.$t)
            // console.log(dog)
            var petArray = [];
            user.favPets.forEach( (animal) => {
                petArray.push(animal.petfinderId)
            })

            query.offset = doc.petfinder.lastOffset.$t
            // update the query object with lastOffset here
            res.render('results', {doc, showNavbar, user, petArray, query});
        });

    })
}


function show(req,res,next) {
     var options = {
        url: `${basePath}pet.get?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&id=${req.params.id}`,
        method: 'GET'
    };
    User.populate(req.user, 'favPets', function(err, user) {
    request(options.url, function(err,response,body) {
        var showNavbar = false;
        let doc = JSON.parse(body);
        var petArray = [];
        user.favPets.forEach( (animal) => {
            petArray.push(animal.petfinderId)
        })
        res.render('showpet', {doc, showNavbar, user:req.user, petArray});
    });
    })
}


function showFavPet(req,res) {
    var options = {
       url: `${basePath}pet.get?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&id=${req.params.id}`,
       method: 'GET'
   };
    User.populate(req.user, 'favPets',function(err, user) {
        request(options.url, function(err,response,body) {
            var showNavbar = false;
            let doc = JSON.parse(body);
            var petArray = [];
            user.favPets.forEach( (animal) => {
                petArray.push(animal.petfinderId)
            })
            res.render('showpet', {doc, showNavbar, user:req.user, petArray});
     });
    })
}


module.exports = {
    search,
    show,
    showFavPet
}
