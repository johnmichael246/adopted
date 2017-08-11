var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./../config/database');

const commentSchema = new Schema ({
    content: Text,
}, {
    timestamps: true
});
const favPetSchema = new Schema ({
    name:String,
    contact: {
        phone:String,
        email:String,
        state: String,
        city: String,
        zipcode:String,
    },
    petfinderId:String,
    photos:[String],
    description:Text,
    animal:String,
    comments:[Comments]
}, {
    timestamps:true
})

module.exports = mongoose.model('Pet', favPetSchema);