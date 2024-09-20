// Starting Point Of Our Application..

const express = require("express");



const PORT = process.env.PORT || 2000;
const app = express();

// The below function is known as request handler.
app.use("/hello", (req, res) =>{
    res.send("Hello From The Server !! This is the hello page!!");
});

app.use("/test", (req, res) =>{
    res.send("This is the test page!!");
});

app.use(["/", "/home"], (req, res) =>{
    res.send("This is the home page!!");
});



app.listen(PORT, (err) =>{
    if (err){
        console.log(`Error: ${err}`);
    }
    console.log(`Application is running on: http://localhost:${PORT}`);
});