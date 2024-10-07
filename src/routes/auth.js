const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user2");
const validator = require("validator");
const jwt = require("jsonwebtoken");


const authRouter = express.Router();

authRouter.post("/signup", async (req, res) =>{
    try{
        validateSignUpData(req);

        const { firstName, lastName, emailId, password, age, gender, photoUrl, about, skills } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age,
            gender,
            photoUrl,
            about,
            skills
        });
        await user.save();
        res.json({message: "User added successfully"});
    }
    catch(err){
        res.status(400).json({ Error: `${err.message}` });
    }
});

authRouter.post("/login", async (req, res) =>{
    try{
        const { emailId, password } = req.body;
        if (!validator.isEmail(emailId)){
            throw new Error("Invalid credentials");
        }

        const user = await User.findOne({ emailId: emailId });
        if (!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid){
            const token = jwt.sign({ _id: user._id }, "Dev@Tinder32t276", { expiresIn: "1d"});
            res.cookie("token", token);
            res.json({ message: "Login successful"});
        }
        else{
            throw new Error("Invalid credentials");
        }
    }
    catch(err){
        res.status(400).json({ Error: `${err.message}` });
    }
});

authRouter.post("/logout", async (req, res) =>{
    /*
    steps:
    1. Do cleanup Activity.
    2. Expire the cookies and tokens;
    */
   
    // To use this code as logout API, add userAuth middlware..
    // const user = req.user;
    // const token = jwt.sign({ _id: user._id }, "Dev@Tinder32t276", { expiresIn: "0d"});
    // res.cookie("token", token);

    // OR,

    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({ message: "Logout successful"});
});



module.exports = authRouter;