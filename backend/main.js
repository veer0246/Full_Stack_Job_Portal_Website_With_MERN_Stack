import express from 'express';
// const express = require('express');  // this is the old way to import module
import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({});
import connectDB from './utils/db.js';
import userRoutes from './routes/userRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

const app = express();   

app.get('/home',(req,res)=>{
    return res.status(200).json({
        message:"I am coming from backend",
        success:true
    })
});

//middleware----------
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {   
    origin:'http://localhost:5173',
    Credentials:true
}
app.use(cors(corsOptions))  

   
// create api routes----------------
app.use("/api/user",userRoutes)
app.use("/api/company", companyRoutes)

// server to listen on this port--------
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    connectDB();  
    console.log(`server is running at http://localhost:${PORT}`)
})   