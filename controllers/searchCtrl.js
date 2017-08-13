var router = require('express').Router();
var request = require('request');

function searchPets(req,res) {
  request(url: rootURL + 'pet.get?' + 'key=' + process.env.PETFINDER_KEY + '&id=38860268', {method:"get"})
}







module.exports = {
    searchPets
}