const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user2");
const { validateSignUpData } = require("./utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");


const PORT = process.env.PORT || 6666;
const app = express();

app.use(express.json());

// POST /signup API
app.post("/signup", async (req, res) =>{
    /* 
    1. First Thing to be done is validation of request data (Can be done by 
       the help of utility function(Where all validations are to be done))
       Here we will only write the logic for the /signup API..
    
    2. Encrypt the password..

    3. Store the user data into the database..
    */

    try{
        validateSignUpData(req);

        const { firstName, lastName, emailId, password, age, gender, photoUrl, about, skills } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({     // This is the correct way to create an user instance..
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
        res.send({message: "User added successfully"});
    }
    catch(err){
        res.status(400).send({ Error: `${err.message}` });
    }
});

// POST /login API
app.post("/login", async (req, res) =>{
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
            res.send({ message: "Login Successful"});
        }
        else{
            throw new Error("Invalid credentials");
        }
    }
    catch(err){
        res.status(400).send({ Error: `${err.message}` });
    }
});

connectDB()
.then(() =>{
    console.log("Database Connection Successful..");
    app.listen(PORT, () =>{
        console.log(`The application is listening on: http://localhost:${PORT}`);
    });
})
.catch((err) =>{
    console.log(`Error: ${err}`);
})