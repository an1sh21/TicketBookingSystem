const { Console } = require('console');
const express = require('express');

const app = express()



app.get('/', (req,res) => {
    res.json({mssg:'Welcome to the app'})
})
app.listen(4000, () =>{
    console.log("lISTENING ON PORT",4000);
    

})



const xyz = require('./people.js');
console.log(xyz);


const fs = require('fs');

const readStream = fs.createReadStream('./data.txt',{encoding: 'utf-8'});

readStream.on('data',(chunk)=>{
    console.log("NEW CHUNK");
        console.log(chunk);
})