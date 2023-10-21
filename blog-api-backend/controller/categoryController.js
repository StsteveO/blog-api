const asyncHandler = require("express-async-handler");
const verifyToken= require("../middleware/verifyToken");
const Category= require("../models/categoryModel");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

//import any models that needs to be interacted with

exports.category_list_get = [verifyToken, asyncHandler(async (req, res, next) =>{
  // console.log("asyncHandler working")
  // console.log(req.headers.authorization.split(" ")[1]);
  //get info needed
  try {
    const allCategories = await Category.find({})
    .sort({name: 1})
    .exec();
    // console.log("backend is working");
    res.status(200).json(allCategories);
  } catch (error) {
    console.error(error);
    // console.log(res.header);
    res.status(500).json({ errors: "Internal Server Error" });
  }
})];

exports.specific_category_get = function (req, res, next) {
  res.send(`This gets a specific category; category ${req.params.id}.`);
};

exports.create_category_form_get = function (req, res, next) {
  res.send("This gets an artical creation form.");
};

exports.category_create_form_post = [
  //validate and sanitize fields
  body("categoryName")
    .isLength({ min: 1 })
    .withMessage("Please enter a category name.")
    .trim()
    .escape(),

  body("categorySynopsis")
    .isLength({ min: 1 })
    .withMessage("Please enter a synopsis.")
    .trim()
    .escape(),

  //process req post sanitation, and validation
  asyncHandler(async (req, res, next) => {
    // console.log(req.user);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {
        const newSubmittedCategory = new Category({
          name: req.body.categoryName,
          synopsis: req.body.categorySynopsis,
        });

        await newSubmittedCategory.save();
        res
          .status(200)
          .json({ success: true, message: "New category successful" });
      } catch (err) {
        // console.log(err);
        res.status(500).json({ errors: "Internal Server Error" });
      }
    }
  }),
];