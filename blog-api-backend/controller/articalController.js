const asyncHandler = require("express-async-handler");
const verifyToken = require("../middleware/verifyToken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const User = require("../models/userModel");
const Article = require("../models/articleModel");
//import any models that needs to be interacted with

exports.artical_client_get = asyncHandler(async (req, res, next) => {
  try {
    // console.log("fetching...");
    const clientArticals = await Article.find({
      article_is_active: true,
    })
      .populate("author")
      .populate("category")
      .exec();
    res.status(200).json(clientArticals);
    // console.log("fetch successful");
  } catch (error) {
    // console.log("failed to fetch");
    res.status(500).json({ errors: "Internal Server Error" });
  }
});

exports.specific_artical_get = function (req, res, next) {
  res.send(`This gets a specific artical; artical ${req.params.id}`);
};

exports.artical_list_get = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    res.status(200).json(req.user);
  }),
];

exports.artical_create_form_post = [
  //validate and sanitize fields
  body("title")
    .isLength({ min: 1 })
    .withMessage("Please enter a title.")
    .trim()
    .escape(),

  body("article_picture")
    .isLength({ min: 1 })
    .withMessage("Please enter a picture URL.")
    .trim()
    .escape(),

  body("picture_credit")
    .isLength({ min: 1 })
    .withMessage("Please give credit to the photographer.")
    .trim()
    .escape(),

  body("preview")
    .isLength({ min: 1 })
    .withMessage("Please give an article synopsis.")
    .trim()
    .escape(),

  body("article_body")
    .isLength({ min: 1 })
    .withMessage("Please write your article.")
    .trim()
    .escape(),

  // process req post sanitation and validation
  
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const newSubmittedArticle = new Article({
          title: req.body.title,
          author: req.body.authorId,
          category: req.body.category,
          article_picture: req.body.article_picture,
          picture_credit: req.body.picture_credit,
          preview: req.body.preview,
          article_body: req.body.article_body,
          article_is_active: req.body.article_is_active,
        });

        await newSubmittedArticle.save();
        res
          .status(200)
          .json({ success: true, message: "New article successfull." });
      } catch (err) {
        console.log(err);
        res.status(500).json({ errors: "Internal Server Error" });
      }
    }
  }),
];

exports.article_delete_post = [
  verifyToken,
  
  //validate and sanitize fields
  body("articleToDelete")
    .isLength({ min: 1 })
    .withMessage("Missing article to delete.")
    .trim()
    .escape(),

  // process req post sanitation and validation
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        await Article.findByIdAndRemove(req.body.articleToDelete);
        res
          .status(200)
          .json({ success: true, message: "Article Successfully Deleted." });
      } catch (err) {
        console.log(err);
        res.status(500).json({ errors: "Internal Server Error" });
      }
    }
  }),
];

exports.article_update_post = [
  //validate and sanitize fields
  body("title")
    .isLength({ min: 1 })
    .withMessage("Please enter a title.")
    .trim()
    .escape(),

  body("article_picture")
    .isLength({ min: 1 })
    .withMessage("Please enter a picture URL.")
    .trim()
    .escape(),

  body("picture_credit")
    .isLength({ min: 1 })
    .withMessage("Please give credit to the photographer.")
    .trim()
    .escape(),

  body("preview")
    .isLength({ min: 1 })
    .withMessage("Please give an article synopsis.")
    .trim()
    .escape(),

  body("article_body")
    .isLength({ min: 1 })
    .withMessage("Please write your article.")
    .trim()
    .escape(),

  // process req post sanitation and validation

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        console.log("Gathering info");
        const newSubmittedArticle = new Article({
          title: req.body.title,
          author: req.body.authorId,
          category: req.body.category,
          article_picture: req.body.article_picture,
          picture_credit: req.body.picture_credit,
          preview: req.body.preview,
          article_body: req.body.article_body,
          article_is_active: req.body.article_is_active,
          _id: req.body.articleId,
        });
        
        console.log("pre-find by ID")
        await Article.findByIdAndUpdate(
          req.body.articleId,
          newSubmittedArticle,
          {}
        );
        console.log("post find by ID")
        res
          .status(200)
          .json({ success: true, message: "Edit article successfull." });
      } catch (err) {
        console.log(err);
        console.log("Error occured");
        res.status(500).json({ errors: "Internal Server Error" });
      }
    }
  }),
];