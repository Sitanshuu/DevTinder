const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user2");


const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res) =>{
    try{
        const loggedInUser = req.user;
        
        const connectionRequests = await ConnectionRequest.find({ 
            toUserId: loggedInUser._id,
            status: "interested" 
        }).populate("fromUserId", ["firstName", "lastName", "emailId"]);

        res.json(connectionRequests);
    }
    catch (err){
        res.status(400).json({ Error: `${err.message}` });
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) =>{
    try{
        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser, status: "accepted" },
                { fromUserId: loggedInUser, status: "accepted" }
            ]
        })
        .populate("fromUserId", ["firstName", "lastName"])
        .populate("toUserId", ["firstName", "lastName"]);

        const data = connections.map((row) =>{
            if (row.fromUserId.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });
        res.json(data);
    }
    catch (err){
        res.status(400).json({ Error: `${err.message}` });
    }
});

userRouter.get("/user/feed", userAuth, async (req, res) =>{
    // The user should see all the card in the database, except:
    //        => Himself
    //        => The connection request "interested" users
    //        => The connection request "accepted" users
    //        => The connection request "ignored" users
    //        => The connection request "rejected" users

    try{
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id} 
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();

        connectionRequests.forEach(req =>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select("firstName lastName age gender photoUrl about skills")
        .skip(skip)
        .limit(limit);

        res.json(users);
    }
    catch (err){
        res.status(400).json({ Error: `${err.message}` });
    }
});



module.exports = userRouter;