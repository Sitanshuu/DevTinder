const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user2");


const PORT = process.env.PORT || 5555;
const app = express();


app.use(express.json());

app.post("/signup", async (req, res) =>{
    const user = new User(req.body);

    try{
        if (req.body.skills?.length > 10){
            throw new Error("Cannot add more than 10 skills");
        }
        await user.save();
        res.send({ Message: "User Added Successfully"});
    }
    catch(err){
        res.status(400).send(`Something Went Wrong: ${err.message}`);
    }
});

app.patch("/user/:userId", async (req, res) =>{
    const userId = req.params?.userId;    // If we want to send userId from the JSON object or from the url itself using dynamic path
    const data = req.body;
    
    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isUpdateAllowed){     // Other properties of the schema validations..
            throw new Error("Update Not Allowed" );
        }
        if (data.skills?.length > 10){     // Skills Validations..
            throw new Error("Skills cannot be more than 10");
        }

        // {runValidators: true} will run the validators in the schema by default 
        // if it is true (We have to explicitely switch on the runValidators)..
        await User.findByIdAndUpdate(userId, data, {runValidators: true});
        res.send({ message: "User Updated Successfully" });
    }
    catch(err){
        res.status(400).send(`Something Went Wrong: ${err.message}`);
    }
});



connectDB()
.then(() =>{
    console.log("Database Connection Successful...");
    app.listen(PORT, () =>{
        console.log(`The application is running on: http://localhost:${PORT}`);
    });
})
.catch((err) =>{
    console.log(`Error: ${err}`);
});