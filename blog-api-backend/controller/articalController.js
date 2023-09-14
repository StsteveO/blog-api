const asyncHandler = require("express-async-handler");
// const {body, validationResult}= require ("express-validator");
//import any models that needs to be interacted with

exports.specific_artical_get = function (req, res, next) {
  res.send(`This gets a specific artical; artical ${req.params.id}`);
};

exports.create_artical_form_get = function (req, res, next) {
  res.send("This gets an artical creation form.");
};

exports.create_artical_form_post = function (req, res, next) {
  res.send("This submits an artical creation form.");
};