const User = require('../models/user');
const {v4 : uuidv4} = require('uuid');
const {setUser} = require('../services/auth')

async function handleSignUpForm(req,res){
     let  {name,email,password} =  req.body;
         await User.create({
            name,
            email,
            password,
        })
        return res.redirect("/")
}

async function handleUserLogIn(req,res){
     const  {email,password} =  req.body;
         const user = await User.findOne({email, password})
         if(!user)
         return res.render('login',{error : 'Invalid Input Found'})
         const sessionId = uuidv4()
         setUser(sessionId,user);
         res.cookie('uid',sessionId);
         return res.redirect("/")
}

module.exports = {
    handleSignUpForm,
    handleUserLogIn
}