const express= require("express");
const router= express.Router();

const artical_controller = require("../controller/articalController");
const category_controller = require("../controller/categoryController");
const sign_up_controller = require("../controller/signUpController");
const login_controller = require("../controller/loginController");
const user_controller= require("../controller/userController")

// we have article, user, and category models

// http://localhost:3000/blog......
router.get("/articles_client", artical_controller.artical_client_get);

router.get("/articles_user", user_controller.article_user_get);

router.post("/article_delete", artical_controller.article_delete_post);

router.post("/article_update", artical_controller.article_update_post);

router.post("/category_delete", category_controller.category_delete_post);

router.post("/category_update", category_controller.category_update_post);

router.get("/account_edit", user_controller.account_edit_get);

router.post("/account_update", user_controller.account_edit_post);

router.get("/account_delete", user_controller.account_delete_get);

router.get("/articals/:id", artical_controller.specific_artical_get) //specific artical once clicked

router.get("/article_list", artical_controller.artical_list_get) //get form for new article

// router.get("/user_data", user_controller.user_data_get) //get current users info

router.post("/artical_create", artical_controller.artical_create_form_post); //enter form for new article

router.get("/category_list", category_controller.category_list_get) //category list USED & DONE!

router.get("/categories/:id", category_controller.specific_category_get); //specific category

router.get("/create_category_form", category_controller.create_category_form_get)

//router.post("/create_category_form", category_controller.create_category_form_post);

router.post("/category_create", category_controller.category_create_form_post); //USED & DONE!

router.get("/login", login_controller.login_form_get) //get login form

router.post("/login", login_controller.login_form_post) //enter login form

router.get("/sign_up", sign_up_controller.sign_up_form_get) //get signup form

router.post("/sign_up", sign_up_controller.sign_up_form_post); //enter signup form


module.exports= router;