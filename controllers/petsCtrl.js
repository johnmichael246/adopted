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
            let dog = doc.petfinder.pets.pet
            console.log(dog)
            var petArray = [];
            user.favPets.forEach( (animal) => {
                petArray.push(animal.petfinderId)
            })

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
            var _id = '';
            user.favPets.forEach( (animal) => {
                petArray.push(animal.petfinderId)
                if (animal.petfinderId === req.params.id) {
                    console.log('got the _id! ', animal._id)
                    console.log('got the _id! ', animal.petfinderId)
                    _id = animal._id
                }
            })

            res.render('showpet', {doc, showNavbar, user:req.user, petArray, _id});
         });
    })
}


function createComment(req, res) {
    // step 1 establish connection - when you press submit -> you see 'hello' in the response in the network tab
    // step 2: make sure you can console.log the favorite id (make sure it's your internal db _id) and the current user (req.user)
    // step 3: grab the favorite pet from the db
    // step 4: redirect to show page

    // console.log('comment controller')

    // console.log(req.params.petId)

    // console.log(req.user.first_name)

    // console.log(req.body.comment)

    var _id = req.params.petId
    var name = req.user.first_name
    var comment = {
        content: req.body.comment,
        name: name
    }

    Pet.findById(_id, function(err, pet) {
        if(err) console.log(err)
        console.log(pet)
        pet.comments.push(comment)
        pet.save(function(err, savePet) {
            if(err) console.log(err)
            console.log('----')
            console.log(pet)
            console.log(savePet)
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
