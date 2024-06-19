const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    property:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
})

const property = mongoose.model('property',propertySchema);

module.exports = property