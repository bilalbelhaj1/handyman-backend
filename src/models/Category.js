const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    icon:{
        type:String,
        required:false
    }
},{timestamps:true});

module.export = mongoose.module('Category',categorySchema);