// Place to define User Schema..

const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({     // Pass all the parameter that defines a user..
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);



module.exports = User;