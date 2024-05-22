const express = require('express');
const cluster = require('cluster');
const process = require('process');
const os = require('os');
const app = express();
const PORT = 8000;

const numCPUs = os.availableParallelism();
console.log(numCPUs)

if(cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });

}else{
    app.listen(PORT,()=> console.log(`Server Started at  ${PORT}`));
    console.log(`Worker ${process.pid} started`);
}




