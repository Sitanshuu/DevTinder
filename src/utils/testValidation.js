// Done..
const validator = require("validator");


const signupDataValidation = (req) =>{
    const { userName, emailId, password } = req.body;

    if (!userName){
        throw new Error("Username required");
    }
    if (!validator.isEmail(emailId)){
        throw new Error("Enter a valid email");
    }
    if (!password){
        throw new Error("Password required");
    }
};



module.exports = { signupDataValidation };