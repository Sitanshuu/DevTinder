const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user2");


const requestRouter = express.Router();

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

requestRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) =>{
    try{        
        //        A  -->  B
        // 1. Validate the status
        // 2. Validate the requestId (Is it belonging to B or not)
        // 3. requestId should be valid and in our database
        // 4. loggedInUserId === toUserId
        // 5. Status must be interested
        
        const loggedInUser = req.user;
        const status = req.params.status;
        const requestId = req.params.requestId;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)){
            return res.status(400).json({ Message: `Invalid status type: ${status}` });
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        });
        if (!connectionRequest){
            return res.status(400).json({ Message: "No connection request found" });
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({ Message: data });
    }
    catch (err){
        res.status(400).json({ Error: `${err.message}` });
    }
});



module.exports = requestRouter;