const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user2");
const { validateProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");


const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) =>{
    try{
        const user = req.user;
        res.json(user); 
    }
    catch(err){
        res.status(400).json({ message: `${err.message}` });
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
    const user = req.user;
    const data = req.body;
    
    try{
        if (!validateProfileData(req)){
            throw new Error("Cannot update fields");
        }
        await User.findOneAndUpdate({ _id: user?._id }, data, { runValidators: true });
        res.json({ message: "User updated successfully" });
    }
    catch (err){
        res.status(400).json({ Error: `${err.message}` });
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) =>{
    const user = req.user;
    const newPassword = req.body.password;
    
    try{
        const newPasswordHash = await bcrypt.hash(newPassword, 10);
        const data = {
            password: newPasswordHash
        }
        await User.findOneAndUpdate({ _id: user?._id }, data, { runValidators: true });

        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.json("Password updated successfully! Please login again");
    }
    catch (err){
        res.status(400).json({ Error: `${err.message}` });
    }
});



module.exports = profileRouter;