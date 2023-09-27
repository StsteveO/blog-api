const asyncHandler = require("express-async-handler");
const verifyToken = require("../middleware/verifyToken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const User = require("../models/userModel");
const Article = require("../models/articleModel");
//import any models that needs to be interacted with

exports.user_data_get = [
  console.log("backend error!"),
  verifyToken,
  asyncHandler(async (req, res, next) => {
    res.status(200).json(req.user);
  }),
];
