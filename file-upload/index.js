const express = require("express");
const path = require('path');
const multer  = require('multer')

const app = express();
const PORT = 8000;
app.use(express.urlencoded({ extended: false }));
app.set('view engine','ejs')
app.set('views',path.resolve('views'))



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniquePrifix = Date.now() ;
      return cb(null, uniquePrifix + '-' +  file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

app.get('/',(req,res)=>{
    res.render('file')
})
app.post('/upload',upload.single('image'),(req,res)=>{
    console.log(req.file)
    res.redirect('/')
})

app.listen(PORT,()=>console.log(`Server Started at ${PORT}`))
