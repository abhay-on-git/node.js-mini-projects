const express = require('express')
const URL = require('../models/url')
const router = express.Router();

router.get('/',async (req,res)=>{
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

router.get('/signup',(req,res)=>{
    res.render('signup')
})
router.get('/login',(req,res)=>{
    res.render('login')
})

module.exports = router;