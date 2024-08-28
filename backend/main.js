import express from 'express';
// const express = require('express');  // this is the old way to import module
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();

const port = 3000;

//middleware----
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    Credentials:true
}
app.use(cors(corsOptions))



//
app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`)
})