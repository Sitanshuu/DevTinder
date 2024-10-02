const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user2");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");


const PORT = process.env.PORT || 7777;
const app = express();


app.use(express.json());

app.use(cookieParser());


app.post("/login", async (req, res) =>{
    try{
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId: emailId });

        if (!user){
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid){
            throw new Error("Invalid Credentials");
        }
        else{
            // 1. Create a JWT Token..
            const token = await jwt.sign({ _id: user._id }, "Dev@Tinder32t276");

            // 2. Add the token to cookie & send the response back to the user..
            res.cookie("token", token);
            res.send({ message: "Login successful" });
        }
    }
    catch(err){
        res.status(400).send({ Error: `${err.message}` });
    }
});

app.get("/profile", userAuth, async (req, res) =>{
    try{
        const user = req.user;
        res.send(user); 
    }
    catch(err){
        res.status(400).send({ message: `${err.message}` });
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) =>{
    try{
        

    }
    catch(err){
        res.status(400).send({ Error: `${err.message}` });
    }
});



connectDB()
.then(() =>{
    console.log("Database Connection Successful..");
    app.listen(PORT, () =>{
        console.log(`The application is running on: http://localhost:${PORT}`);
    });
})
.catch((err) =>{
    console.log(`Error: ${err}`);
});