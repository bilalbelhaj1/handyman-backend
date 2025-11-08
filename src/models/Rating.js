const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:'True'
    },
    score:{
        type:number,
        required:true,
        min:0,
        max:5
    },
    comment:{
        type:String,
        trim:true,
        maxlength:500
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestapms:true});

module.export = mongoose.module('Rating',ratingSchema);
