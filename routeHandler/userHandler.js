const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.post("/login", async(req, res) => {
    try {
        const user = await User.find({ userName: req.body.userName });
        if(user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);

            if(isValidPassword) {
                // generate token
                const token = jwt.sign({
                    username: user[0].userName,
                    userId: user[0]._id,
                }, process.env.JWT_SECRET, {
                    expiresIn: '48h'
                });

                res.status(200).json({
                    "access_token": token,
                    "message": "Login successful!"
                });
            } else {
                res.status(401).json({
                    "error": "Authetication failed!"
                });
            }
        } else {
            res.status(401).json({
                "error": "Authetication failed!"
            });
        }
    } catch {
        res.status(401).json({
            "error": "Authetication failed!"
        });
    }
});

router.get('/all', async (req, res) => {
    try {
        const users = await User.find().populate("todo");

        res.status(200).json({
            data: users,
            message: "Success"
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: "There was an error on the server side!"
        });
    }
});

module.exports=router