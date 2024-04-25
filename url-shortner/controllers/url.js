const shortid = require("shortid")
const URL = require("../models/url")

// console.log("inside controllers")

async function handleGenrateNewShortURL(req,res){
    // console.log("handleGenrateNewShortURL")
   const body = req.body;
   console.log(body)
   if(!body.url){
    // console.log("inside empty body")
    return res.status(400).json({error : "url is required"});
   }
   const shortID = shortid(8);
   await URL.create({
    shortId:shortID , 
    redirectURL:body.url,
    visitHistory:[]
   })
 return res.redirect(`/?id=${shortID}`)
}

async  function handleRedirectToOriginalURL(req,res){
    const shortID = req.params.shortId;
    // console.log(shortID)
    try {
        const entry = await URL.findOneAndUpdate(
            {
                shortId: shortID // Ensure 'shortId' matches your model field name
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    }
                }
            },
        );
    // console.log(entry)
        if (!entry) {
            console.log("Short URL not found");
            return res.status(404).json({ error: "Short URL not found" });
        }

        // console.log("Redirecting to:", entry.redirectURL);
        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error during redirection:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function handleAnalyticsById(req,res){
    const shortId = req.params.shortId;
    try {
        const urlData = await URL.findOne({shortId:shortId});
        if(!urlData){
            console.log("No data for this ID");
            return res.status(404).json({err:"No Data Found"})
        }
        return res.status(200).json({TotalClicks:urlData.visitHistory.length,analytics:urlData.visitHistory});

    } catch (error) {
        console.log("error in finding in urlData")
        return res.send(error);
    }

}
module.exports = {
    handleGenrateNewShortURL,
    handleRedirectToOriginalURL,
    handleAnalyticsById
}