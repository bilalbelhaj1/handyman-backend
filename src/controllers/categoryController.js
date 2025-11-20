const Category = require('Category');
const Admin = require('../models/Admin');

exports.createCategory = async (req,res) => {
    const {adminId, categoryTitle} = req.body;

    if(!adminId || !categoryTitle){
        return res.status(400).json({message:"All fields are required"});
    }

    try{
        const admin = await Admin.findById(adminId);

        if(!admin){
            return res.status(400).json({message:"Admin not found"});
        }

        if(admin.role === 'admin' && admin.role === 'owner'){
            return res.status(403).json({message:"You don't have permission to do this action"});
        }

        const newCategory = {
            title:categoryTitle
        }

        await newCategory.save();

        return res.status(201).json({message:"Category added successfully"});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.editCategory = async (req, res) => {
    const {adminId, oldTitle, newTitle} = req.body;

    if(!adminId || !newTitle){
        return res.status(400).json({message:"All fields are required"});
    }

    try{
        const admin = await Admin.findById(adminId);
        
        if(!admin){
            return res.status(400).json({message:"Admin not found"});
        }

        if(admin.role != 'admin' && admin.role != 'owner'){
            return res.status(403).json({message:"You don't have permission to do this action"});
        }

        const category = await Category.findOne(oldTitle);

        if(!category){
            return res.status(400).json({message:"Category not found"});
        }

        category.title = newTitle;
        await category.save();

        return res.status(201).json({message:"Category updated successfully"});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.getAllCategories = async (req,res) => {
    try{
        const categories = await Category.find().selec();
        return res.status(200).json({message:"All categories",categories});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.deleteCategory = async (req,res) =>{
    const {adminId, categoryId} = req.body;

    if(!adminId || !categoryId){
        return res.status(400).json({message:"All fields are required"});
    }

    try{
        const admin = await Admin.findById(adminId);

        if(!admin){
            return  res.status(400).json({message:"Admin not found"});
        }

        if(admin.role != 'admin' && admin.role != 'owner'){
            return res.status(403).json({message:"You don't have permission to do this action"});
        }

        const category = await Category.findByIdAndDelete(categoryId);
        await category.save();

        return res.status(200).json({message:"Category deleted successfully"});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}