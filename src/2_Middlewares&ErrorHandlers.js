const express = require("express");



const PORT = process.env.PORT || 2222;
const app = express();


// One route can also have multiple route handlers..
// We can wrap all the route handlers with an array, it works exactly the same..
// app.use(<path>, rH1, rH2, [rH3, rH4], rH5);
app.get("/user", 
    // (req, res, next) =>{
        // console.log("Handling the route handler 1.");
        // res.send("First Response.");     // ERR: Cannot set headers after they are sent t o the client (if Uncommented as the response is sent to the client in this line itself)..
        // next();
    // }, 
    
    (req, res, next) =>{
        console.log("Handling the route handler 2.");
        // res.send("Second Response.");
        next();
    }
);

app.get("/user", (req, res, next) =>{     // Independent Route Handler Of /user path..
    console.log("Handling the route handler 3.");
    res.send("Third Response.");
});

app.get("/", (req, res) =>{     // Home Route..
    res.send("This is the homepage of the application running on PORT: 2222");
});



app.listen(PORT, (err) =>{
    if (err){
        console.log(`Error: ${err}`);
    }
    console.log(`The application is running on: http://localhost:${PORT}`);
});