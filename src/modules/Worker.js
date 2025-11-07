const mongoose = require('mongoose');
const validator = require('validator');

const workerSchema = mongoose.Schema({
    firs_name:{
        type:String,
        required:true,
        minlength:3
    },
    last_name:{
        type:String,
        required:true,
        minlength:3
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
        match:[validator.isEmail, 'Adresse email invalide']
    },
    province:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    cin:{
        type:String,
        required:true,
        unique:true
    },
    birth:{
        birth_day:{
            type:Date,
            required:true
        },
        birth_city:{
            type:String,
            required:true
        }
    },
    profession:{
        type:String,
        required:true
    },
    password:{
        type:String,
    }
},{timestamps:true});

module.export = mongoose.module('Worker',workerSchema);