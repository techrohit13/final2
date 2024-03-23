const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require("../models/userModel");

const loginHandler = async (req, res) => {
    try {
        // Find the user by their mobile number
        const user = await User.findOne({ number: req.body.number });
        
        // If user doesn't exist, return an error
        if (!user) {
            return res.status(401).json({ message: "Incorrect Mobile Number" });
        }

        // Decrypt the stored password and compare with the provided password
        const decodedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        
        if (decodedPassword !== req.body.password) {
            // If passwords don't match, return an error
            return res.status(401).json({ message: "Incorrect Password" });
        }

        // If credentials are correct, generate JWT token
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        
        // Return the token as part of the response
        // res.json({ accessToken });
        res.json({ accessToken, userId: user._id });

    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = loginHandler;
