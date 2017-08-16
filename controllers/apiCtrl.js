var router = require('express').Router();
var Pet = require('./../models/favpet');
var Pet = require('./../models/user');

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
function toggleFav(req,res) {
    console.log('++++++++++++++++')
    
    // console.log(req)
    console.log(req.params.id)
    console.log(req.user)
    console.log(req.user.favPets)
    // if(req.user.favPets.some(function(pet) {
    //     console.log('hit the second function')
    //     pet.equals(id)})) {
    //         console.log('its working');
    // } 
}


module.exports = {
    getAllPets,
    getOnePet,
    createPet,
    updatePet,
    deletePet,
    toggleFav
};