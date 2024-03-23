const CryptoJS = require('crypto-js');  //bcrypt

const User = require("../models/userModel");

const signupHandler = async (req, res) => {
    try{
        const newUser = new User({
            username: req.body.username,
            number: req.body.number,
            email: req.body.email,
            // password: req.body.password
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString()

            // The CryptoJS.AES.encrypt() function is used to encrypt 
            // the password using the Advanced Encryption Standard (AES) algorithm.
        });
        const savedUser = await newUser.save();
        console.log(savedUser);
        // Return success response with a message and an identifier
        res.status(201).json({ message: "User created successfully", redirectToLogin: true });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error creating a user" })
    }
}

module.exports = signupHandler;


