var router = require('express').Router();
var Pet = require('./../models/favpet');
var User = require('./../models/user');
const basePath = "http://api.petfinder.com/"
var request=require('request');

function getAllPets(req,res) {
    Pet.find({},(err,movies) => {
        res.status(200).json(pets)
    });
}

function getOnePet(req,res) {
    Pet.findById(req.params.id, (err,pet) => {
        res.status(200).json(pet)
    });
}

function createPet(req,res) {
    var pet = new Pet(req.body);
    pet.save( (err) => {
        res.status(201).json(pet)
    });
}

function updatePet(req,res) {
    Pet.findByIdAndUpdate(req.params.id, req.body, {new:true},(err, pet)=> {
        res.status(200).json(pet)
    });
}

function deletePet(req,res) {
    Pet.findByIdAndRemove(req.params.id, (err) => {
        res.status(200).json(pet)
    });
}



function toggleFav(req, res) {
    console.log('hitting')

    console.log(req.params.id)
    console.log(req.user.favPets)

    User.populate(req.user, 'favPets', function(err, user) {
        if (user.favPets.some(dog => dog.petfinderId === req.params.id) ) {
            user.favPets.splice(dog._id,1)
            console.log('the dog has been removed')
            res.end();
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
                            photos: dog.media.photos.photo[2].$t,
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


module.exports = {
    getAllPets,
    getOnePet,
    createPet,
    updatePet,
    deletePet,
    toggleFav
};