// Done..
const jwt = require("jsonwebtoken");
const User = require("../models/user3_test");


const userAuth = async (req, res, next) =>{
    try{
        const { token } = req.cookies;
        if (!token){
            throw new Error("Invalid token");
        }

        const decodedObj = await jwt.verify(token, "test@DevTinder2134isdai");

        const { _id } = decodedObj;
        const user = await User.findById(_id);
        if (!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }
    catch(err){
        res.status(400).send({ Error: `${err.message} `});
    }
};



module.exports = { userAuth };