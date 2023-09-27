const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const User= require("../models/userModel");
require("dotenv").config();
// const {body, validationResult}= require ("express-validator");
//import any models that needs to be interacted with

exports.login_form_get = function (req, res, next) {
  res.send("This gets the login form.");
};

exports.login_form_post = [
  //validate and sanitize fields: username, password
  body("username")
    .isLength({ min: 1 })
    .withMessage("Please enter username.")
    .trim()
    .escape(),

  body("password")
    .isLength({ min: 1 })
    .withMessage("Please enter password.")
    .trim()
    .escape(),

  //process req after validating and sanitizing user info
  asyncHandler(async (req, res, next)=>{
    const errors= validationResult(req);
    const {username, password}= req.body;

    if(!errors.isEmpty()){ //if errors, send back errors
      return res.status(400).json({ errors: errors.array() });
    }else{
      try{
        //find user by username
        const user= await User.findOne({ username });
        //send error if user & password not found
        if(!user || !bcrypt.compareSync(password, user.password)){
          return res.status(401).json({errors: "Invalid Credentials"});
        }

        //if user found/authenticated creat and send jwt
        const token= jwt.sign({
          userId: user._id,
          username: user.username,
          firstName: user.first_name,
        }, process.env.JWT_SECRET, {
          expiresIn: "3h", //token expiration time
        });

        res.status(200).json({ token });
      } catch (error){
        console.error(error);
        res.status(500).json({ errors: "Internal Server Error" });
      }
    }
  })
];