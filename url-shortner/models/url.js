const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type: String,
        required: true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"user"
    },
    visitHistory:[{timestamp:{type : Number}}]
},{timestamp:true})

const URL = new mongoose.model( "url", urlSchema );

module.exports=URL;