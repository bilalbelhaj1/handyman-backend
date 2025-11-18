const mongoose = require('mongoose');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    cin:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        enum:['owner','admin']
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('Admin',adminSchema);