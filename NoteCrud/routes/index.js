const express = require('express');
const path = require('path');
const fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
  const fileFolder = path.join(__dirname, "..", "public", "uploads");
  const filenames = fs.readdirSync(fileFolder);
  console.log(filenames);
  

  res.render('index', { filenames,
    data : '',
    filename : '',
  }); // Set default empty filename
});

router.post('/create', (req, res, next) => {
  let filename = req.body.filename;
  if (!filename) return res.send("Please enter the filename.");

  const filePath = path.join(__dirname, "..", "public", "uploads", filename);
  

  fs.writeFile(filePath, `This is the content of ${filename}`, (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`File created successfully.`);
    }
  });
   return res.redirect(`/${filename}`)
});

router.get('/delete/:filename',(req,res)=>{
   const filename = req.params.filename;
   const filePath = path.join(__dirname, "..", "public", "uploads", filename);
  fs.unlinkSync(filePath);
  res.redirect('/')

})

router.post('/update/:filename', (req, res) => {
  const filename = req.params.filename;
  const fileContent = req.body.filecontent;
  const filePath = path.join(__dirname, "..", "public", "uploads", filename);
  try {
    fs.writeFileSync(filePath, fileContent);
    res.redirect(`/${filename}`); 
  } catch (err) {
    console.error(err); 
    res.sendStatus(500); 
  } 
});

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "..", "public", "uploads", filename);
  const fileFolder = path.join(__dirname, "..", "public", "uploads");
  const filenames = fs.readdirSync(fileFolder);
  try {
    const data = fs.readFileSync(filePath, 'utf-8'); 
    return res.render('index', { filename, data,filenames}); 
  } catch (err) {
    console.error(err.message);
    res.send("Error reading file content.");
  }
  res.redirect('/');
});

module.exports = router;
