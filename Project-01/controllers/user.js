const User = require("../models/user");

async function handleGetAllUsers(req,res){
    const allDBUsers = await User.find()
    console.log(allDBUsers,"alldbuser")
   return res.json(allDBUsers);
}

async function handleGetUsersById(req,res){
    const user = await User.findById(req.params.id)
    console.log(user)
    if(!user) return res.status(404);
    return  res.json(user);
}

async function handleCreateNewUser(req,res){
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
    return res.status(201).json({msg:"Succecss",id:result._id});
    }catch(err){
        console.log(err)
    }
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:"succecss"});
}

async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id,{first_name:req.body.first_name})
    return res.json({status:'User updated'});
}


module.exports = {
    handleGetAllUsers,
    handleGetUsersById,
    handleCreateNewUser,
    handleDeleteUserById,
    handleUpdateUserById
}