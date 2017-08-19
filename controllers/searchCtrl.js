var router = require('express').Router();
var request = require('request');
var User = require('./../models/user');
var Pet = require('./../models/favpet');
const basePath = "http://api.petfinder.com/"

function search(req,res,next) {
    var query = {
        size: req.body.size,
        age: req.body.age,
        animal: req.body.animal,
        zip: req.body.zip,
        offset: req.body.offset || 0
    }

    var options = {
        url: `${basePath}pet.find?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&size=${query.size}&age=${query.age}&animal=${query.animal}&location=${query.zip}&count=27&offset=${query.offset}`,
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
            query.offset = doc.petfinder.lastOffset.$t
            res.render('results', {doc, showNavbar, user, petArray, query});
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

function toggleFav(req, res) {
    User.populate(req.user, 'favPets', function(err, user) {
        if (user.favPets.some(dog => dog.petfinderId === req.params.id) ) {
            var dogDocId = user.favPets.find(dog => dog.petfinderId === req.params.id)._id;
            User.findById(req.user.id, function(err, u) {
                u.favPets.remove(dogDocId);
                u.save();
            });
        } else {
            console.log('hitting add dog part of request')
            Pet.findById(req.params.id, function(err, dog) {
                if(dog) {
                    req.user.favPets.push(dog._id);
                    req.user.save();
                    res.end()
                } else {
                    var options = {
                    url: `${basePath}pet.get?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&id=${req.params.id}`,
                    method: 'GET'
                    };
                    request(options.url, function( err, response, body) {

                        let doc = JSON.parse(body);
                        let dog = doc.petfinder.pet;
                        Pet.create({
                            name: dog.name.$t,
                            contact: {
                                phone: dog.contact.phone.$t,
                                email: dog.contact.email.$t,
                                state: dog.contact.state.$t,
                                city: dog.contact.city.$t,
                                zipcode: dog.contact.zip.$t
                            },
                            petfinderId: dog.id.$t,
                            photos: dog.media.photos.photo[2].$t || "http://i.imgur.com/vI1T0h6.jpg?1",
                            description: dog.description.$t,
                            animal: dog.animal.$t
                        }, function( err, dog) {
                                console.log(err)
                                console.log('Get dog from MONGO', dog)
                                req.user.favPets.push(dog._id);
                                req.user.save(function(err) {
                                    res.end();
                            });
                        });
                    })
                }
            })
        }
    })
};


function createComment(req, res) {
    var _id = req.params.petId
    var name = req.user.first_name
    var comment = {
        content: req.body.comment,
        name: name
    }
    Pet.findById(_id, function(err, pet) {
        if(err) console.log(err)
        pet.comments.push(comment)
        pet.save(function(err, savePet) {
            if(err) console.log(err)
            res.redirect('/search/favorites/' + pet.petfinderId )
        })
    })
}

function deleteComment(req, res) {
    var _id = req.params.petId
    Pet.findById(_id, function (err, pet) {
       pet.comments.remove(req.params.commentId);
       pet.save()
        res.redirect('/search/favorites/' + pet.petfinderId )
       })
}

function searchShelters(req,res,next) {
    var query = {
        zip: req.body.zip,
        offset: req.body.offset || 0
    }
    console.log(query)
    var options = {
        url: `${basePath}shelter.find?&key=${process.env.PETFINDER_KEY}&secret=${process.env.PETFINDER_SECRET}&format=json&location=${query.zip}&count=27&offset=${query.offset}`,
        method: 'GET'
    };
    request(options.url, function(err,response,body) {
        var showNavbar = true;
        let doc = JSON.parse(body);
        query.offset = doc.petfinder.lastOffset.$t
        res.render('shelters', {doc, showNavbar, user:req.user, query});
    });
}

module.exports = {
    search,
    show,
    showFavPet,
    createComment,
    deleteComment,
    toggleFav,
    searchShelters
}