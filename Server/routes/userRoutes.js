//import express  from "express";
const express= require('express');

//import {registerUser}from "../controllers/userControllers.jsexpr";
const {registerUser ,logoutUser, authUser, allUsers}= require('../controllers/userControllers')
const {protect}= require("../middlewares/authMiddleware")

const router=express.Router()

router.route('/').post(registerUser).get(protect,allUsers)
router.route('/logout').put(protect,logoutUser )
router.post('/login',authUser)


module.exports= router;