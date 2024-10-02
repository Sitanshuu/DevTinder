// Done..
const mongoose = require("mongoose");


const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://Sitanshuu:xOcKhSGMMhMNve24@namaste-nodejs.b3310.mongodb.net/Test");
};



module.exports = { connectDB };