const asyncHandler = require("express-async-handler");
// const {body, validationResult}= require ("express-validator");
//import any models that needs to be interacted with

exports.sign_up_form_get = function (req, res, next) {
  res.send("This gets the sign-up form.");
};

exports.sign_up_form_post = function (req, res, next) {
  res.send("This submits the sign-up form.");
};