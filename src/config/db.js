const mongoose = require('mongoose');

const connectDB = async (url) => {
    try{
        await mongoose.connect(url);
        console.log("db connected")
    } catch(err){
        console.log(err)
        throw new Error("Could not connect to database")
    }
}

module.exports = { connectDB }