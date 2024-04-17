const express = require("express");
const {handleGenrateNewShortURL} = require("../controllers/url")

const router  = express.Router();
console.log("inside routes")
router.post('/',handleGenrateNewShortURL)

module.exports = router;