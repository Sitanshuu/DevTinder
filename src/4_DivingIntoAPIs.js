const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user1");


const PORT = process.env.PORT || 4444;
const app = express();

app.use(express.json());    // Built-in middleware (work for all the routes automatically) converts json request to request object..

// Signup API - POST /signup - Add new user to the database..
app.post("/signup", async (req, res) =>{
    // console.log(req.body);
    // To read this json data sent from the client, we need a middleware (we will use it in every API's)
    // express-json is a built-in middleware which checks the incoming request and 
    // convert the JSON to javascript request,
    // put it to the body and give us access to that data.

    // Creating new instance of the User Model..
    const user = new User(req.body);

    try{
        await user.save();
        res.send({ Message: "User Added Successfully"});
    }
    catch(err){
        res.status(400).send(`Something Went Wrong: ${err.message}`);
    }
});

// User With EmailId API - GET /user - get user with emailId from the database..
app.get("/user", async (req, res) =>{
    const userEmail = req.body.emailId;

    try{
        const users = await User.find({ emailId: userEmail });
        if (users.length === 0){
            res.status(404).send({ Error: "User Not Found" });
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send(`Something Went Wrong: ${err.message}`);
    }
});

// Feed API - GET /feed - get all the users from the database..
app.get("/feed", async (req, res) =>{
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send(`Something Went Wrong: ${err.message}`);
    }
});

// Delete API - DELETE /user - delete the user from the database..
app.delete("/user", async (req, res) =>{
    const userId = req.body.userId;

    try{
        await User.findByIdAndDelete(userId);
        res.send({ Message: "User Deleted Successfully"});
    }
    catch(err){
        res.status(400).send(`Something Went Wrong: ${err.message}`);
    }
});

// Patch API - PATCH /user - Update user in the database based on their _id..
app.patch("/user", async (req, res) =>{
    const userId = req.body.userId;
    const updatedData = req.body;

    try{
        await User.findByIdAndUpdate(userId, updatedData);
        res.send({ message: "User Updated Successfully" });
    }
    catch(err){
        res.status(400).send(`Something Went Wrong: ${err.message}`);
    }
});

// Patch API - PATCH /user - Update user in the database based on their emailId..
app.patch("/user", async (req, res) =>{
    const emailId = req.body.emailId;
    const updatedData = req.body;

    try{
        const user = await User.findOneAndUpdate({emailId: req.body.emailId}, updatedData);
        console.log(user);
        res.send({ message: "User Updated Successfully" });
    }
    catch(err){
        res.status(400).send(`Something Went Wrong: ${arr.message}`);
    }
});



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