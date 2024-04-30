const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const {connectMongoDB} = require("./connection")
const urlRouter = require("./routes/url")
const staticRouter = require('./routes/staticRouter');
const userRouter = require('./routes/user');
const {checkForAuthentication,restrictTo} = require('./middlewares/auth')

const app = express();
const PORT = 8001;
connectMongoDB('mongodb://127.0.0.1:27017/url-shortner').then(()=>console.log("MongoDB Connected"))

app.use(express.json()); 
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(checkForAuthentication);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views')); 


app.use("/" ,staticRouter);
app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRouter);
app.use('/user',userRouter);

app.listen(PORT,()=>console.log("Server is running on port "+PORT))