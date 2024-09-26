const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");



const PORT = process.env.PORT || 3333;
const app = express();

app.post("/signup", async (req, res) =>{
    const userObj = {
        firstName: "Subham",
        lastName: "Jena",
        emailId: "jenasubham@gmail.com",
        password: "subjin123",
        age: 23,
        gender: "Male"
    };

    const user = new User(userObj);     // Creating new instance of a User model..
    
    try{      // Always wrap DB Operations inside of try and catch block to handle errors in a good manner
        await user.save();
        res.send("User Added Successfully..");
    }
    catch(err){
        res.status(400).send(`Error Saving The User To The Database: ${err.message}`);
    }
});



// First Connect to the database and then listen to incoming requests..
// If database connection is successful then listen..
connectDB()
.then(() =>{
    console.log("Database Connection Successful...");
    app.listen(PORT, () =>{
        console.log(`The application is running on: http://localhost:${PORT}`);
    });
})
.catch((err) =>{
    console.log(`Error: ${err}`);
});