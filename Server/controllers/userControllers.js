const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please be sure to fill all the required fields!")
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400);
        throw new Error('This email is already in use!')
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
        })
    } else {
        res.status(401);
        throw new Error('Failed to create user')
    }
});

const logoutUser=asyncHandler(async (req, res) => {
    const {userId} = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        userId,{
            status: 'offline'
        }, {
            new: true 
        }
    )
    if (!updatedUser) {
        res.status(404);
        throw new Error("User Not Found");
    } else {
        res.json(updatedUser);
    }
})

const authUser= asyncHandler(async(req,res)=>{
    const {email, password}=req.body;

    const user= await User.findOne({ email })
   
    
    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            status: user.status,
            pic: user.pic,
            token: generateToken(user._id),
        })
        user.status = 'online';
        await user.save();
    }else {
        res.status(401);
        throw new Error('Invalid Email or Password')
    }
})

const allUsers= asyncHandler(async(req,res)=>{
    //IF THERE IS QUERY INSIDE OF IT WE'RE GONNA SEARCH THE USER BY THIER NAME AND EMAIL
    const keyword = req.query.search?{
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ],

    }:{};

    const users= await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users)
})

module.exports = { registerUser, authUser, allUsers, logoutUser };