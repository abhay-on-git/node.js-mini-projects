const express = require('express')
const URL = require('../models/url')
const router = express.Router();

router.get('/',async (req,res)=>{
  // const allUrls = await URL.find();
  res.render('home',{
    // urls:allUrls,
  })
})

router.get('/analytics',async (req,res)=>{
  console.log("inside analytics route")
  if(!req.user)  return res.redirect('/login');
  console.log('user founded')
  console.log(req.user._id);
  const allUrls = await URL.find({createdBy:req.user._id});
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