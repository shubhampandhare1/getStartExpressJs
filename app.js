// const http = require('http');
const express = require('express');

const app = express();

app.use((req,res,next)=>{
    console.log('In first middleware');
    next();
})

app.use((req,res,next) =>{
    console.log('In Second Middleware');
    let value='Hello World';
    res.send({ key1: value });
})

// const server = http.createServer(app)

app.listen(3000);

// server.listen(3000, () => {
//     console.log(`Server running @ http://localhost:3000`);
// })