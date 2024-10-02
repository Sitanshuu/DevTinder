// For Lecture-2
// const adminAuth = (req, res, next) =>{        // Middleware called for all admin routes & checks for authentication of admin..
//     const token = "admin";
//     const isAdminAuthorized = token === "admin";
//     if (isAdminAuthorized){
//         next();
//     }
//     else{
//         res.status(401).send("Unauthorized Request!!");
//     }
// };

const jwt = require("jsonwebtoken");
const User = require("../models/user2");


// For Lecture-7
const userAuth = async (req, res, next) =>{
    try{
        // 1. Read the token from the req.cookies and validate the token..
        const { token } = req.cookies;
        if (!token){
            throw new Error("Invalid token");
        }
        
        // 2. Verify the token..
        const decodedObj = await jwt.verify(token, "Dev@Tinder32t276");

        // 3. Find the user
        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user){
            throw new Error("User not present");
        };
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).send({ Error: `${err.message}`});
    }
};



module.exports = { userAuth };