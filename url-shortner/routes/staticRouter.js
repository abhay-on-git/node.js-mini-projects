const express = require('express')
const URL = require('../models/url')
const router = express.Router();

router.get('/test',async (req,res)=>{
  const {id} = req.query
  const allUrls = await URL.find({});
  res.render('home',{
    urls:allUrls,
    id :id
  })
})
router.get('/analytics',async (req,res)=>{
  const allUrls = await URL.find({});
  res.render('analytics',{
    urls:allUrls,
  })
})

module.exports = router;