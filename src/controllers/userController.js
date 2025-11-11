const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


exports.register = async (req,res) => {
    const {Name,lastName,phoneNumber,province,city} = req.body;
    console.log(req.body);
    try{
        const existingUser = await User.findOne({phoneNumber});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        function genreratePassword(){
            const array = new Uint8Array(8);
            crypto.getRandomValues(array);
            const digits = Array.from(array,b=> String(b%10));
            return digits.join('');
        }

        async function hashPass(){
            const password = genreratePassword();
            const hashedPassword = await bcrypt.hash(password,10);
            return {password,hashedPassword};
        }

        const {password, hashedPassword} = await hashPass();

        const newUser = await User.create({
            firstName:Name,
            familyName:lastName,
            password:hashedPassword,
            phoneNumber,
            city,
            province
        });

        return res.status(201).json({message:'User created successfully', user:newUser, generatedPassword:password});// <==== Generated password will be send to the user via WhatsApp

    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.login = async (req,res) => {
    const {phone,password} = req.body;
    try{
        if(!phone || !password){
            return res.status(400).json({message:'Phone number and password are required'});
        }

        const user = await User.findOne({phone});

        if(!user){
            return res.status(400).json({message:'Invalid phone number'});
        }

        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({message:"Invalid password"});
        }

        const token = jwt.sign(
            {userId:user._id,phone:user.phoneNumber},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN || '7d'}
        )

        return res.status(201).json({message:'Login successfull',token});

    }catch(err){
        console.error(err);
        return res.status(500).json({message:'Internal server error'});
    }
}

exports.editProfil = async (req,res) => {
    const {email,phone,oldPassword,newPassword,profilePic} = req.body;
    const userId = req.body.userId;
    console.log(req.body);
    try{
        if(!email && !phone && !password && !profilePic){
            return res.status(400).json({message:'Nothing to update'});
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        if(email){
            user.email = email;
        }
        if(phone){
            user.phoneNumber = phone;
        }
        if(profilePic){
            user.profilePicture = profilePic;
        }
        const isMatch = await bcrypt.compare(user.password,oldPassword);
        if(!isMatch){
            return res.status(400).json({message:'Old password is incorrect'});
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({message:"Updates saved"},user);

    }catch(err){
        console.error(err);
        return res.status(500).json({message:'Internal server error'});
    }
}