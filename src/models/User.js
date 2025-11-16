const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3
    },
    lastName:{
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
    coordinates: {
      type: [Number],
      required:false
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
    },
    cin:{
        type:String,
        unique:true
    },
    birth:{
        day:{
            type:String
        },
        city:{
            type:String
        }
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type: String,
        enum: ['worker', 'user'],
        required:true
    },
    profilePicture:{
        type:String,
        default:''
    },
    totalJobs:{
        type:Number,
        default:0
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);