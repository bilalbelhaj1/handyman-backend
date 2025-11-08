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
        lowercase:true,
        match:[validator.isEmail, 'Adresse email invalide']
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
        enum:['manager','admin']
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

module.export = mongoose.module('Admin',adminSchema);