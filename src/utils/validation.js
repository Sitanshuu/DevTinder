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


module.exports = { validateSignUpData };