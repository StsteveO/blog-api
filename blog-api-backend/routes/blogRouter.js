const express= require("express");
const router= express.Router();

const test_controller= require("../controller/testHomePageController")

router.get("/", test_controller.test_controller);

module.exports= router;