const asyncHandler = require("express-async-handler");
const verifyToken = require("../middleware/verifyToken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const User = require("../models/userModel");
const Article = require("../models/articleModel");
//import any models that needs to be interacted with

exports.article_user_get = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    try {
      console.log("fetching user articles...");
      const clientArticals = await Article.find({})
        .populate("author")
        .populate("category")
        .exec();
      res.status(200).json(clientArticals);
      console.log("fetch user articles successful");
    } catch (error) {
      console.log("failed to fetch user articles");
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }),
];