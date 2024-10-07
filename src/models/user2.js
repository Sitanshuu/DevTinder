const mongoose = require("mongoose");
const validator = require("validator");


// index: true || unique: true 
// will create index in the schema for faster retrieval of data..
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,      // MongoDB will automatically create index for unique: true
        trim: true,
        validate(value){    // Email validation using validator package..
            if (!validator.isEmail(value)){
                throw new Error("Type a correct email");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        lowercase: true,
        uppercase:true,
        // Custom validate function..
        // By default this validate method will only be called when a new document
        // is created, but when we try to update a document which already
        // exist it will not run by itself, But we have to enable it in the
        // option parameter..
        validate(value){
            if (!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid..");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.pngwing.com/en/free-png-bvbry",
        validate(value){
            if (!validator.isURL(value)){
                throw new Error("The photo url is not a valid url");
            }
        }
    },
    about: {
        type: String,
        default: "This is the default about!!"
    },
    skills: {
        type: [String]
    }
},

// Stores the timestamps in the documents.. 
// (Automatically adds and updates the timestamps at the 
// time of adding and updating user)..
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);



module.exports = User;