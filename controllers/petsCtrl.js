var router = require('express').Router();
var request = require('request');
var User = require('./../models/user');
var Pet = require('./../models/favpet');
const basePath = "http://api.petfinder.com/"

function search(req,res,next) {
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

            res.render('results', {doc, showNavbar, user, petArray});
        });
    })
}

function show(req,res,next) {
     var options = {
        url: `${basePath}pet.get?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&id=${req.params.id}`,
        method: 'GET'
    };
    Pet.where({petfinderId: req.params.id}).find(function (err, allPets) {
        if (err) console.log(err)
        var commentsArray = [];
        
        allPets.forEach(pet => {
            commentsArray = commentsArray.concat(pet.comments)
        })
        User.populate(req.user, 'favPets', function(err, user) {
            request(options.url, function(err,response,body) {
                var showNavbar = false;
                let doc = JSON.parse(body);
                var petArray = [];
                var _id = '';
                
                user.favPets.forEach( (animal) => {
                    petArray.push(animal.petfinderId)
                    if (animal.petfinderId === req.params.id) {
                        _id = animal._id
                    }
                })
                res.render('showpet', {doc, showNavbar, user:req.user, petArray, _id, commentsArray});
            });
        })
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
            var _id = '';
            var commentsArray = [];

            user.favPets.forEach( (animal) => {
                petArray.push(animal.petfinderId)
                if (animal.petfinderId === req.params.id) {
                    _id = animal._id
                    commentsArray = animal.comments
                }
            })
            res.render('showpet', {doc, showNavbar, user:req.user, petArray, _id, commentsArray});
         });
    })
}


function createComment(req, res) {
    var _id = req.params.petId
    var name = req.user.first_name
    var comment = {
        content: req.body.comment,
        name: name
    }
    Pet.findById(_id, function(err, pet) {
        if(err) console.log(err)
        // console.log(pet)
        pet.comments.push(comment)
        pet.save(function(err, savePet) {
            if(err) console.log(err)
            res.redirect('/pets/favorites/' + pet.petfinderId )
        })
    })
}

module.exports = {
    search,
    show,
    showFavPet,
    createComment
}
