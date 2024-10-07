const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user2");


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
});    // Dummy sendRequest

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) =>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const toUser = await User.findOne({ _id: toUserId });
        if (!toUser){
            return res.status(400).json({ Message: "User not found" });
        };
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)){
            return res.status(400).json({ Message: `Invalid status type: ${status}`});
        };

        // If there is an existing connection request..
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });
        if (existingConnectionRequest){
            return res.json({ Message: "Connection request already exist" });
        };

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();
        res.json({ Message: `Connection request is: ${status}`, data });
    }
    catch (err){
        res.status(400).json({ Error: `${err.message}` });
    }
});



module.exports = requestRouter;