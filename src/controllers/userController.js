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