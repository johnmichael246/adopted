var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var db = require('./../config/database')

var userSchema = new Schema ({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    email:{type:String,required:true},
    phone_num:String,
    favPets:[{type:ObjectId, ref:"favPet"}]

}, {
    timestamps:true
})




module.exports = mongoose.model('User', userSchema)