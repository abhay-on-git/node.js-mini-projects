const express = require( 'express' );
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 8000;

app.get("/users",(req,res)=>{
    const html = `
    <ul>${users.map((user)=>`<li>${user.first_name}</li>`).join("")}</ul>
    `
    res.send(html);
})
app.get("/",(req,res)=>{
    res.send("HomePage")
})
app.get("/api/users",(req,res)=>{
    res.json(users)
})
app.route("/api/users/:id").get((req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user=>user.id === id)
    res.json(user)
})
.post((req,res)=>{})
.patch((req,res)=>{})

app.listen(PORT,()=>console.log("Server Initialized"));