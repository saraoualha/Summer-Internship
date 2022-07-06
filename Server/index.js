import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

//const express= require('express');
const app = express(); 
app.use(bodyParser.json({limit: "30mp", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mp", extended: true}));
app.use(cors());

const CONNECTION_URL='mongodb+srv://internship:internship123@cluster0.dkzkg.mongodb.net/?retryWrites=true&w=majority';
const PORT= process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
    .catch((err)=>console.log(err.message));

//mongoose.set('useFindAndModify',false);