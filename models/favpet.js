var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./../config/database');

const commentSchema = new Schema ({
    content: String,
    name: String
}, {
    timestamps: true
});
const favPetSchema = new Schema ({
    name:String,
    contact: {
        phone:String,
        email:String,
        address:String,
        state: String,
        city: String,
        zipcode:String,
    },
    petfinderId:String,
    photos:[String],
    description:String,
    animal:String,
    comments:[commentSchema]
}, {
    timestamps:true
})

module.exports = mongoose.model('Pet', favPetSchema);