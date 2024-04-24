const express = require("express");
const {handleGenrateNewShortURL} = require("../controllers/url")
const {handleRedirectToOriginalURL} = require( "../controllers/url" )
const {handleAnalyticsById} = require('../controllers/url')

const router  = express.Router();
// console.log("inside routes")
router.post('/',handleGenrateNewShortURL)
router.get('/:shortId',handleRedirectToOriginalURL)
router.get('/analytics/:shortId',handleAnalyticsById)

module.exports = router;