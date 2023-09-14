const asyncHandler = require("express-async-handler");
// const {body, validationResult}= require ("express-validator");
//import any models that needs to be interacted with

exports.index = function (req, res, next) {
  res.send("This gets the index page with the list of all articals.");
};
