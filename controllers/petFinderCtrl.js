var request = require('request');

function search(req,res) {
    var options= {
        url:rootURL + 'pet.find?' + 'key=' + process.env.PETFINDER_KEY,
        headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
        }
    };
  request(options, function(err, response, body) {
    var pet = JSON.parse(pet);
    console.log (pet);
  });
}

function petDetails(req, res) {


  
}






module.exports = {
  search,
  petDetails
};
