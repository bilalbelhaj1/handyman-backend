const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }
},{timestamps:true});

module.export = mongoose.model('Category',categorySchema);