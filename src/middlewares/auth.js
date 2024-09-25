const adminAuth = (req, res, next) =>{        // Middleware called for all admin routes & checks for authentication of admin..
    const token = "admin";
    const isAdminAuthorized = token === "admin";
    if (isAdminAuthorized){
        next();
    }
    else{
        res.status(401).send("Unauthorized Request!!");
    }
};

module.exports = {adminAuth};