const express = require( 'express' );
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: true }));
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
app.post(("/api/users/"),(req,res)=>{
    const body = req.body;
    users.push({...body,id:users.length+1})
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status :"success",id:users.length});
    })
    
})
app.delete(("/api/users/:id"),(req,res)=>{
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);
    if(userIndex > -1){
        users.splice(userIndex,1);
        fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
            return res.json({status:"deleted  succesfully",id:id});
        })
    }else{
        return res.json({status : "Invalid user" , id: id})
    }
})

app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        const updateUser = users[userIndex];
        // Check if request body is empty
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send('No data provided for update.');
        }
        for (const key in req.body) {
            if (key in updateUser) {
                updateUser[key] = req.body[key];
            }
        }
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Error writing to file.');
            }
            // Send response after file is successfully written
            res.json({ status: "updated successfully", id: id });
        });
    } else {
        res.status(404).send('User not found.');
    }
});


app.listen(PORT,()=>console.log("Server Initialized"));