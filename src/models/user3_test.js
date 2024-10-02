// Done..
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 20,
        unique: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    requestSent: {
        type: [{}]
    },
    requestReceived: {
        type: [{}]
    }
},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);



module.exports = User;