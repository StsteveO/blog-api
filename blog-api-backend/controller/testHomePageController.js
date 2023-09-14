const asyncHandler= require("express-async-handler");
// const {body, validationResult}= require ("express-validator");
//import any models that needs to be interacted with 

exports.test_controller= function (rea, res, next){
    res.send("The router is active, and working, and the controller is active and working.");
}