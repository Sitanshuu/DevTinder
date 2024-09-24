const express = require("express");



const PORT = process.env.PORT || 2000;
const app = express();


// This will match all the HTTP method API calls to /test..
app.use("/test", (req, res) =>{
    res.send("This is the test page!!");
});

// This will only handle GET call to /user..
app.get("/user", (req, res) =>{
    res.send({firstName: "Sitanshu", lastName: "Das", country: "India", state: "Odisha"});
});

// We can also use REGEX in the path parameter inside of a requet handler..

// Dynamic Path Routes..
app.get("/user/:userId/:userName", (req, res) =>{
    res.send(req.params);
});

app.get("/getUser", (req, res) =>{
    res.send(req.query);
});



app.listen(PORT, (err) =>{
    if (err){
        console.log(`Error: ${err}`);
    }
    console.log(`Application is running on: http://localhost:${PORT}`);
});