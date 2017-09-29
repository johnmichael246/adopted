var router = require('express').Router();
var Pet = require('./../models/favpet');
var User = require('./../models/user');
const basePath = "http://api.petfinder.com/";
var request=require('request');
require('./../config/database');

function getAllPets(req,res) {
    Pet.find({},(err,pets) => {
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

module.exports = {
    getAllPets,
    getOnePet,
    createPet,
    updatePet,
    deletePet,
};