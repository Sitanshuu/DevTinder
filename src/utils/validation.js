const validator = require("validator");


const validateSignUpData = (req) =>{
    const { firstName, lastName, emailId } = req.body;
    if (!firstName || !lastName){
        throw new Error("First name and Last name are required fields.");
    }
    else if (!validator.isEmail(emailId)){
        throw new Error("Please enter a valid email.");
    }
};

const validateProfileData = (req) =>{
    const ALLOWED_UPDATES = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];
    const isUpdateAllowed = Object.keys(req.body).every((k) =>
        ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed){
        throw new Error("Update Not Allowed");
    }
    return isUpdateAllowed;
};


module.exports = { validateSignUpData, validateProfileData };