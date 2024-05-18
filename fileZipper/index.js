const express = require('express');
const path = require('path');
const fs = require('fs')
const zlib = require('zlib');
const expressStatusMonitor = require('express-status-monitor');

const PORT = 8000;
const app = express();
app.use(expressStatusMonitor())

fs.createReadStream("./file.txt","utf-8").pipe(zlib.createGzip()).pipe(fs.createWriteStream("./file.zip"));

app.get('/',(req,res)=>{
   const stream = fs.createReadStream("./file.txt","utf-8");
   stream.on("data",(chunk)=> res.write(chunk));
   stream.on("end",()=> res.end());
})

app.listen(PORT,()=>console.log('server started at 8000'));