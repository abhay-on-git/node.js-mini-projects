const express = require('express');

const app = express();
app.get("/",(req,res)=>{
    res.send("Hellow from HomePage")
})
app.get("/about",(req,res)=>{
    res.send("Hellow from AboutPage" + "hey" + req.query.name)
})
app.get("/Aur_Sunao",(req,res)=>{
    res.send("Badiya Tm Batao")
})
app.listen(5000,()=>console.log('EveryThing is Running Fine on Port 5000'))