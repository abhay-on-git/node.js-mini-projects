const express = require( 'express' );
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const app = express();
const mongoose = require("mongoose") ; 
const { timeStamp } = require('console');
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));

// mongoDB connection
const db = mongoose.connect("mongodb://127.0.0.1:27017/practice-app-1")
.then(()=>console.log("MongoDB connected"))
.catch(()=>console.log("Error in MongoDB"));;
// Schema
const userSchema = new mongoose.Schema({
    first_name:{
        type :String,
        required:true,
    },
    last_name:{
        type:String
    },
    email:{
        type: String ,
        unique:true,
        required:true,
    },
    gender:{
        type:String,
    },
    job_title:{
        type:String,
    }
},{timestamps:true});
// model
const User = new mongoose.model("User",userSchema);


app.get("/users",async(req,res)=>{
    const allDBUsers = await User.find({})
    const html = `
    <ul>${allDBUsers.map((user)=>`<li>${user.first_name}</li>`).join("")}</ul>
    `
    res.send(html);
})
app.get("/",(req,res)=>{
    res.json("HomePage")
})
app.get("/api/users",async(req,res)=>{
    const allDBUsers = await User.find({})
    res.send(allDBUsers);
})
app.route("/api/users/:id").get(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404);
    return  res.json(user);
})
app.post(("/api/users/"),async(req,res)=>{
    try{
        const body = req.body;
    if(!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender){
        return res.status(400).json({msg:"All fields are required..."})
    }
    const result = await User.create({
      first_name:body.first_name,
      last_name:body.last_name,
      email:body.email,
      gender:body.gender,
      job_title:body.job_title
    });
    console.log(result)
    return res.status(201).json({msg:"Succecss"});
    }catch(err){
        console.log(err)
    }
})  

app.delete(("/api/users/:id"),async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:"succecss"});
    // const userIndex = users.findIndex(user => user.id === id);
    // if(userIndex > -1){
    //     users.splice(userIndex,1);
    //     fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    //         return res.json({status:"deleted  succesfully",id:id});
    //     })
    // }else{
    //     return res.json({status : "Invalid user" , id: id})
    // }
})

app.patch('/api/users/:id', async(req, res) => {
 await User.findByIdAndUpdate(req.params.id,{first_name:req.body.first_name})
 return res.json({status:'User updated'});

});


app.listen(PORT,()=>console.log("Server Initialized"));