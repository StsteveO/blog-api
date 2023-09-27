const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const User = require("../models/userModel");
//import any models that needs to be interacted with

exports.sign_up_form_get = function (req, res, next) {
  res.send("This gets the sign-up form.");
};

exports.sign_up_form_post = [
  //validate and sanitize fields: firstName, username, password, passwordConfirmation
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

  //process req after validation and sanitation

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } else {
      try {

        //hash password using bcryptjs
        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        const user = new User({
          first_name: req.body.firstName,
          bio: req.body.bio,
          username: req.body.username,
          password: hashedPassword,
        });

        await user.save();
        res.status(200).json({ success: true, message: "User registration successful"});
        // res.redirect("/");

      } catch (err) {
        // return next(err);
        console.error(err);
        res.status(500).json({ errors: "Internal Server Error" });
      }
    }
  }),
];
