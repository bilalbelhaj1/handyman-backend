const Job = require('../models/jobController');
const admin = require('../models/adminController');

exports.addJob = async (req,res) => {
    const {adminId, jobName, category, description} = req.body;
    
    if(!adminId || !jobName || !category || !description){
        return res.status(400).json({message:"All fields are required"});
    }

    try{
        const admin = await User.findById(adminId);

        if(!admin){
            return res.status(400).json({message:"Admin not found"});
        }

        if(admin.role != 'admin' && admin.role != 'owner'){
            return res.status(403).json({message:"You don't have permession to do this action"});
        }

        const existingJob = await Job.findOne({jobName});
        if(existingJob){
            return res.status(400).json({message:"Job already exist"});
        }

        const newJob = {
            title:jobName,
            description:description,
            category:category
        }

        await newJob.save();

        return res.status(201).json({message:"Job added successfully"});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.editJob = async (req,res) => {
    const {adminId,oldJobName, newJobName, newDescription, newCategory} = req.body;
    
    try{
        const admin = await User.findById(adminId);

        if(!admin){
            return res.status(400).json({message:"Admin not found"});
        }

        if(admin.role != 'admin' && admin.role != 'owner'){
            return res.status(403).json({message:"You don't have permession to do this action"});
        }

        const job = await Job.findOne({oldJobName});

        if(newJobName){
            job.title = newJobName;
        }

        if(newDescription){
            job.description = newDescription;
        }

        if(newCategory){
            job.category = newCategory;
        }

        return res.status(201).json({message:"Job was up to date",job});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.deleteJob = async (req,res) => {
    const {adminId, jobId} = req.body;

    if(!adminId || !jobId){
        return res.status(400).json({message:"All fields are required"});
    }
    
    try{
        const admin = await User.findById(id);

        if(!admin){
            return res.status(400).json({message:"Admin not found"});
        }
        
        if(admin.role != 'admin' && admin.role != 'owner'){
            return res.status(403).json({message:"You don't have permession to do this action"});
        }

        const job = await Job.findByIdAndDelete(jobId);
        return res.status(200).json({message:"Job deleted successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

exports.getAllJobs = async (req,res) => {
    try{
        const jobs = await Job.find().select();

        return res.status(200).json({message:"All jobs returned successfully",jobs});
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}