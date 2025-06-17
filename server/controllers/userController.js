const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");       
const validator = require("validator");

// CREATE A TOKEN
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}
// LOGIN f
const loginUser = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({email});
        if(!user) {
            return res.json({success: false, message: "user not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.json({success: false, message: "Invalid username or password"})
        }

        const token = createToken(user._id);
        res.status(200)
        .cookie('token', token, { maxAge: 60 * 60 * 24 * 30, httpOnly: true })
        .json({success: true, message: "Login Successful"})
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: "ERROR"});
    }
}



// REGISTER
const registerUser = async(req, res) => {
    const {username, password, email} = req.body;

    try {
        const exits = await userModel.findOne({ email });
        if(exits) {
            return res.json({success: false, message: "User already exits"});
        }

        // Validation
        if(!validator.isEmail(email)) {
            return res.json({success: false, message: "Please Enter a valid email"})
        }

        if(password.length < 8) {
            return res.json({ success: false, message: "Please Enter a strong password"})
        }

        // IF EVERYTHING WORKS FINE 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // NEW USER 
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword,
        })
        const user = await newUser.save();

        const token = createToken(user._id);
        res.json({success: true, token})
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: "ERROR"});
    }
}

module.exports = { loginUser, registerUser}