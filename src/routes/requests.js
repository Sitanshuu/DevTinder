const express = require("express");
const { userAuth } = require("../middlewares/auth");


const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) =>{
    try{
        // const fromUser = req.user;
        // const { to } = req.body;
        // const toUser = await User.findOne({ userName: to });
        // if (!toUser){
        //     throw new Error("User not found in the database");
        // }

        // // FROM User Update..
        // const updatedDataFromUser = {
        //     requestSent: [{
        //         to: toUser?.userName,
        //         status: "pending"
        //     }]
        // };
        // await User.findOneAndUpdate({ userName: fromUser?.userName }, updatedDataFromUser);
        
        // // TO User Update..
        // const updatedDataToUser = {
        //     requestReceived: [{
        //         from: fromUser?.userName,
        //         status: "pending"
        //     }]
        // };
        // await User.findOneAndUpdate({ userName: toUser?.userName }, updatedDataToUser);

        res.json({ message: `Connection request sent successfully to ${req.body.to}` });
    }
    catch(err){
        res.status(400).json({ Error: `${err.message}` });
    }
});



module.exports = requestRouter;