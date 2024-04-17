const express = require( 'express' );
const users = require("./MOCK_DATA.json");
const fs = require('fs');

const app = express();

app.use(express.urlencoded({ extended: true }));

const PORT = 8000;

const {connectMongoDB} = require("./connection")
connectMongoDB("mongodb://127.0.0.1:27017/").then(()=>console.log("MongoDB connected"))
                                           .catch(()=>console.log("Error in MongoDB"));


// const User = require("./models/user")
const userRouter = require("./routes/user")

app.use("/api/users",userRouter);

app.listen(PORT,()=>console.log("Server Initialized"));