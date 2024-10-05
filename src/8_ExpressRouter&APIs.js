const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");


const PORT = process.env.PORT || 9999;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



connectDB()
.then(() =>{
    console.log("Database Connection Successful...");
    app.listen(PORT, () =>{
        console.log(`The application is listening on: http://localhost:${PORT}`);
    });
})
.catch((err) =>{
    console.log(`Error: ${err}`);
})