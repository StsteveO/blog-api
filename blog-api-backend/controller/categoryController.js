const asyncHandler = require("express-async-handler");
// const {body, validationResult}= require ("express-validator");
//import any models that needs to be interacted with

exports.category_list_get = function (req, res, next) {
  res.send("This gets a list of categories.");
};

exports.specific_category_get = function (req, res, next) {
  res.send(`This gets a specific category; category ${req.params.id}.`);
};

exports.create_category_form_get = function (req, res, next) {
  res.send("This gets an artical creation form.");
};

exports.create_category_form_post = function (req, res, next) {
  res.send("This submits an category creation form.");
};