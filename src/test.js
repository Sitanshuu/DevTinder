const express = require("express");
const { connectDB } = require("./config/testDatabase");
const { userAuth } = require("./middlewares/testAuth");
const { signupDataValidation } = require("./utils/testValidation");
const User = require("./models/user3_test");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser");


const PORT = process.env.PORT || 8888;
const app = express();

app.use(express.json());
app.use(cookieParser());

// POST => /signup    ==> Done.
app.post("/signup", async (req, res) =>{
    try{
        signupDataValidation(req);

        const { userName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            userName,
            emailId,
            password: passwordHash
        });

        await user.save();
        res.send({ message: "User added successfully" });
    }
    catch(err){
        res.status(400).send({ Error: `${err.message}` });
    }
});

// POST => /login     ==> Done.
app.post("/login", async (req, res) =>{
    try{
        const { userName, password } = req.body;
        if (!userName) throw new Error("Username required");
        if (!password) throw new Error("Password required");
    
        const user = await User.findOne({ userName: userName });
        if (!user) throw new Error("User not found");
    
        // We can offload these type of functions to helper functions
        // using schema methods..
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid){
            throw new Error("Invalid credentials");
        }
        else{
            // This can also be offloaded to the helper function in the 
            // userSchema and executed with the help of schema methods..
            // { expiresIn: "1d"} ==> Option to set the expiry date of the token..
            const token = jwt.sign({ _id: user._id }, "test@DevTinder2134isdai", { expiresIn: "1d"});
            // {expires: <Date>} ==> Option to expire the cookie..
            res.cookie("token", token);
            res.send({ message: "Login successful"});
        }
    }
    catch(err){
        res.status(400).send({ Error: `${err.message}` });
    }
});

// GET => /profile     ==> Done.
app.get("/profile", userAuth, async (req, res) =>{
    try{
        const user = req.user;
        res.send(user); 
    }
    catch(err){
        res.status(400).send({ message: `${err.message}` });
    }
});

// POST => /sendRequest     ==> Done.
app.post("/sendConnectionRequest", userAuth, async (req, res) =>{
    try{
        const fromUser = req.user;
        const { to } = req.body;
        const toUser = await User.findOne({ userName: to });
        if (!toUser){
            throw new Error("User not found in the database");
        }

        // FROM User Update..
        const updatedDataFromUser = {
            requestSent: [{
                to: toUser?.userName,
                status: "pending"
            }]
        };
        await User.findOneAndUpdate({ userName: fromUser?.userName }, updatedDataFromUser);
        
        // TO User Update..
        const updatedDataToUser = {
            requestReceived: [{
                from: fromUser?.userName,
                status: "pending"
            }]
        };
        await User.findOneAndUpdate({ userName: toUser?.userName }, updatedDataToUser);

        res.send("Connection request sent successfully");
    }
    catch(err){
        res.status(400).send({ Error: `${err.message}` });
    }
});

// GET => /feed     
app.get("/feed", userAuth, async (req, res) =>{
    try{

    }
    catch(err){
        res.status(400).send({ Error: `${err.message}` });
    }
});



connectDB()
.then(() =>{
    console.log("Database connection successful..");
    app.listen(PORT, () =>{
        console.log(`The application is running on: http://localhost:${PORT}`);
    });
})
.catch((err) =>{
    console.log(`Error: ${err}`);
});