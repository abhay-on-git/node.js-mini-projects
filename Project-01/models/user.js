const mongoose = require("mongoose") ;

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

const User = new mongoose.model("User",userSchema);
module.exports = User;
