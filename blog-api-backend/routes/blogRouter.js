const express= require("express");
const router= express.Router();

const into_page_controller= require("../controller/introPageController")
const artical_controller = require("../controller/articalController");
const category_controller = require("../controller/categoryController");
const sign_up_controller = require("../controller/signUpController");
const login_controller = require("../controller/loginController");

// we have article, user, and category models

// http://localhost:3000/blog......
router.get("/", into_page_controller.index) //index/home page with ALL ACTIVE ARTICALS

router.get("/articals/:id", artical_controller.specific_artical_get) //specific artical once clicked

router.get("/create_article_form", artical_controller.create_artical_form_get) //get form for new article

router.post("/create_article_form", artical_controller.create_artical_form_post); //enter form for new article

router.get("/category", category_controller.category_list_get) //category list

router.get("/categories/:id", category_controller.specific_category_get); //specific category

router.get("/create_category_form", category_controller.create_category_form_get)

router.post("/create_category_form", category_controller.create_category_form_post);

router.get("/login", login_controller.login_form_get) //get login form

router.post("/login", login_controller.login_form_post) //enter login form

router.get("/sign_up", sign_up_controller.sign_up_form_get) //get signup form

router.post("/sign_up", sign_up_controller.sign_up_form_post); //enter signup form

module.exports= router;