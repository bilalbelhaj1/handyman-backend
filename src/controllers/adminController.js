const Admin = require('../models/Admin');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {sendEmail} = require('../tools/emailTransporter');
const fs = require('fs');
const path = require('path');


exports.createNewAdmin = async (req, res) => {
    const {ownerId, firstName, lastName, email, phoneNumber, role, cin} = req.body;

    console.log(req.body);

    if(!ownerId || !firstName || !lastName || !email || !phoneNumber || !role || !cin){
        return res.status(400).json({message:"All fields are required"});
    }
    try{
        const owner = await Admin.findById(ownerId);

        if(!owner || owner.role === 'admin'){
            return res.status(403).json({message:"You can't make this action"});
        }

        const existingAdmin = await Admin.findOne({email});

        if(existingAdmin){
            return res.status(400).json({message:"Admin already exists"});
        }

        function generatePassword(){
            let pwd = '';
            for(let i = 0;i < 8;i++){
                pwd += crypto.randomInt(0,10);
            }
            return pwd;
        }

        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password,10);

        const newAdmin = await Admin.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            role,
            cin,
            password:hashedPassword
        });

        const filePath = path.join(__dirname,'../tools','adminPass.html');
        let htmlTemplate = fs.readFileSync(filePath,'utf8');

        htmlTemplate = htmlTemplate.replace('{{name}}',firstName).replace('{{password}}',password);

        await sendEmail(email,
                `Your Password Admin`,
                `${firstName}, here is your password : ${password}`,
                htmlTemplate);

        return res.status(201).json({message:"New admin added"});
        
    }catch(err){
        console.log(err);
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

exports.banUser = async (req,res) => {
    const {id, banState} = req.body;
    try{
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        user.banned = banState;

        if(user.banned === true){
            return res.status(200).json({message:"User banned successfully!"});
        }else{
            return res.status(200).json({message:"User unbanned successfully"});
        }

    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Interrnal server error"});
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
    const {ownerId, id} = req.body;

    try{
        const owner = await User.findById(ownerId);
        if(!owner){
            return res.status(403).json({message:"You can't make this action"});
        }

        const admin = await Admin.findByIdAndDelete(id);

        return res.status(200).json({message:"Admin deleted",admin});
    }catch(err){
        return res.status(500).json({message:"Internal server error"});
    }
}