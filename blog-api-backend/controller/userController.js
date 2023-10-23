const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
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

exports.account_edit_get = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    try {
      const accountData = await User.find({_id: req.user.userId}, "bio first_name username _id")
      res.status(200).json(accountData);
    } catch (error) {
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }),
];

// bio: 
// first_name: 
// password: 
// username: 
// __v: 0;
// _id: 

exports.account_edit_post = [
  //validate and sanitize fields

  body("firstName")
    .isLength({ min: 1 })
    .withMessage("Please enter first name.")
    .trim()
    .escape(),

  body("bio")
    .isLength({ min: 1 })
    .withMessage("Please enter a bio.")
    .trim()
    .escape(),

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

  body("passwordConfirmation")
    .isLength({ min: 1 })
    .withMessage("Please enter password confirmation.")
    .trim()
    .escape(),

  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match.");
    }
    return true;
  }),

  //process req post validation and sanitation

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        //hash password using bcryptjs
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUpdatedAccount = new User({
          first_name: req.body.firstName,
          bio: req.body.bio,
          username: req.body.username,
          password: hashedPassword,
          _id: req.body.userId,
        });

        await User.findByIdAndUpdate(req.body.userId, newUpdatedAccount, {});
        res
          .status(200)
          .json({ success: true, message: "User update successfull." });
      } catch (err) {
        res.status(500).json({ errors: "Internal Server Error" });
      }
    }
  }),
];

exports.account_delete_get=[
  verifyToken,
  asyncHandler(async (req, res, next) => {
    try {
      await Article.deleteMany({ author: req.user.userId });
      await User.findByIdAndRemove(req.user.userId)
      res
        .status(200)
        .json({ success: true, message: "Account delete successfull." });
    } catch (error) {
      res.status(500).json({ errors: "Internal Server Error" });
    }
  }),
]