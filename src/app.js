const express = require("express");



const PORT = 2000;
const app = express();


// This will only handle GET call to /user
app.get("/user", (req, res) =>{
    res.send({firstName: "Sitanshu", lastName: "Das", country: "India", state: "Odisha"});
});

// This will match all the HTTP method API calls to /test
app.use(["/test", "/"], (req, res) =>{
    res.send("This is the test page!!");
});



app.listen(PORT, (err) =>{
    if (err){
        console.log(`Error: ${err}`);
    }
    console.log(`Application is running on: http://localhost:${PORT}`);
});