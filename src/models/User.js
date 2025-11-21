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
        lowercase:true,
    },
    cin:{
        type:String,
        unique:true,
        sparse:true
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
    rating:{
        type:Number,
        default:0
    },
    profilePicture:{
        type:String,
        default:''
    },
    banned:{
        type:Boolean,
        default:false
    },
    totalJobs:{
        jobsNumber:{type:Number,default:0},
        totalEarned:{type:Number,default:0}
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);