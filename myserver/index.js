const http = require("http");
const url = require("url")
const fs = require("fs")
const myServer = http.createServer((req,res)=>{
  if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()} :  ${req.url} New Request Recived\n`
    const myURL = url.parse(req.url,true);
    console.log(myURL)
    fs.appendFile('log.txt',log,(err,data)=>{
       switch(myURL.pathname){
        case "/" : res.end("HomePage");
                   break;
        case "/about" :res.end("HI! I am Abhay Agnihotri");
                   break;
        case "/contact" :res.end("Kyu Batau tuhje");
                   break;
         default: res.end("404")
       }
    })
});

myServer.listen(8000,()=>console.log("Everything is perfect"))