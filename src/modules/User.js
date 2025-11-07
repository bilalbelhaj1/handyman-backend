const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
        minlength:3
    },
    family_name:{
        type:String,
        required:true,
        minlength:3
    },
    province:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    adresse:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        match:[validator.isEmail, 'Invalid email']
    },
    cin:{
        type:String,
        unique:true
    },
    birth:{
        birth_day:{
            type:String
        },
        birth_city:{
            type:String
        }
    },
    password:{
        type:String
    }
},{timestamps:true});

module.export = mongoose.module('User',userSchema);