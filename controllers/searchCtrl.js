var router = require('express').Router();
var request = require('request');

function search(req,res) {
    var options= {
        url:rootURL + 'pet.get?' + 'key=' + process.env.PETFINDER_KEY + '&id=38860268',
        headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    };
  request(options, function(err, response, body) {
    var pet = JSON.parse(pet);
    console.log (pet);
  });
} 






module.exports = {
    search
}