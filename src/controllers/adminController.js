const Admin = require('../models/Admin.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt = requrie('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service:'gmail',
    aut:{
        user:process.env.EMAIL_ADMIN,
        pass:process.env.EMAIL_PASS
    }
})
exports.createNewAdmin = async (req, res) => {
    const {firstName, lastName, email, phoneNumber, role, cin} = req.body;
    if(!firstName || !lastName || !email || !phoneNumber || !role || !cin){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const existingAdmin = Admin.findOne({email});

        if(existingAdmin){
            return res.status(400).json({message:"Admin already exists"});
        }

        function generatePassword(){
            const array = new Uint8Array(8);
            crypto.getRandomValues(array);
            const digits = Array.from(array, b=> String(b%10));
            return digits.join('');
        }

        async function hashPass(){
            const password = generatePassword();
            const hashedPassword = await bcrypt.hash(passowrd,10);
            return {password, hashedPassword};
        }

        const {password, hashedPassword} = await hashPass();

        const newAdmin = await Admin.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            role,
            cin,
            password:hashedPassword
        });

        await transporter.sendMain({
            from:process.env.EMAIL_ADMIN,
            to:email,
            subject:"Your Password",
            text:`Hello ${firstName} ${lastName}, here is your password : ${password}.\nPlease change it later`
        })

        return res.status(201).json({message:"New admin added"});
        
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.login = async (req,res) => {
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const admin = await Admin.findOne({email});

        if(!admin){
            return res.status(400).json({message:"Invalid email"});
        }

        const passwordMatch = await bcrypt.compare(password,admin.password);

        if(!passwordMatch){
            return res.status(400).json({message:"Incorrect password"});
        }

        const token = jwt.sign(
            {adminId:admin._id,email:admin.email},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN || '1d'}
        )

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'String',
            maxAge: 1000*60*60*24
        })

        return res.status(201).json({message:"Login successful"})
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.editAdminInfo = async (req,res) => {
    const {email,phoneNumber,oldPassword,newPassword,profilePicture} = req.body;
    
    try{

        if(!email && !phoneNumber && !!oldPassword && !profilePicture){
            return res.status(400).json({message:"Nothing to update"});
        }
        
        const admin = await Admin.findOne({email});

        if(!admin){
            return res.status(404).json({message:"Admin not found"});
        }

        if(email){
            admin.email = email;
        }

        if(phoneNumber){
            admin.phoneNumber = phoneNumber;
        }

        if(oldPassword && newPassword){
            const isMatch = await bcrypt.compare(oldPassword,admin.password);
            if(!isMatch){
                return res.status(400).json({message:"Incorrect old password"});
            }
            admin.password = await bcrypt.hash(newPassword,10);
        }
        await admin.save();
        return res.status(200).json({message:"Updates saved"});
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.getAllAdmins = async (req,res) => {
    try{
        const admins = await Admin.find().select('-password');
        return res.status(200).json({message:"All Admins and roles",admins});
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.deleteAdmin = async (req,res) => {
    const id = req.params.id;
    try{
        const admin = await Admin.findByIdAndDelete(id);
        return res.status(200).json({message:"Admin deleted",admin});
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}