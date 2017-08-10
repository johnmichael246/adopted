var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./../config/database');

const favPetSchema = new Schema ({
    id:Number,
    favPets:[String]
}, {
    timestamps:true
})



module.exports = mongoose.model('favPet', favPetSchema)