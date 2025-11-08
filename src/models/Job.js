const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:150,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        maxlength:2000
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    workerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestapms:true});

module.export = mongoose.module('Job',jobSchema);