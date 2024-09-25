const mongoose = require("mongoose");



// Connection to the cluster..
// mongoose.connect("mongodb+srv://Sitanshuu:xOcKhSGMMhMNve24@namaste-nodejs.b3310.mongodb.net/"); 
// But this is not an good way.. 
// This returns a promise so we must wrap it inside an async function and await for the response of the promise..
// Tells us whether the connection was successfully established or not..

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://Sitanshuu:xOcKhSGMMhMNve24@namaste-nodejs.b3310.mongodb.net/DevTinder");
};



module.exports = { connectDB };