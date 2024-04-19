const express = require("express");
const {connectMongoDB} = require("./connection")
const urlRouter = require("./routes/url")

const app = express();
const PORT = 8001;
app.use(express.json()); 
connectMongoDB('mongodb://127.0.0.1:27017/url-shortner').then(()=>console.log("MongoDB Connected"))

app.use("/url",urlRouter);
app.use("/:shortId",urlRouter);
app.use("/analytics/:shortId",urlRouter)

app.listen(PORT,()=>console.log("Server is running on port "+PORT))