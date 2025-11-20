const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
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
    }
},{timestapms:true});

module.exports = mongoose.model('Job',jobSchema);