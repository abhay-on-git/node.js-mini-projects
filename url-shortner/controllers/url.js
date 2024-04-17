const shortid = require("shortid")
const URL = require("../models/url")

console.log("inside controllers")

async function handleGenrateNewShortURL(req,res){
    console.log("handleGenrateNewShortURL")
   const body = req.body;
   console.log(body)
   if(!body.url){
    console.log("inside empty body")
    return res.status(400).json({error : "url is required"});
   }
   const shortID = shortid(8);
   await URL.create({
    shortId:shortID , 
    redirectURL:body.url,
    visitHistory:[]
   })
   return res.json({id:shortID})
}

module.exports = {
    handleGenrateNewShortURL
}