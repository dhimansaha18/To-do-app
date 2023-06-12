const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongoose=require('mongoose');
const userSchema=require('../schemas/userSchema');
const User = new mongoose.model('User', userSchema)

router.post('/signup', async(req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            userName: req.body.userName,
            name: req.body.name,
            password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({
          Message: "Successfully Signed up!!!",
        });
      } catch (error) {
        res.status(500).json({
          error: "Server Side Error" + error,
        });
      }
    
});

module.exports=router