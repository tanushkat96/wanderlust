const express=require("express");
const router=express.Router();

const wrapAsync= require("../utils/wrapAsync");
const passport= require("passport");
const { saveRedirectUrl } = require("../middleware");
const usercontroller = require("../controllers/users");

router
    .route("/signup")
    .get(usercontroller.renderSignup)
    .post(wrapAsync(usercontroller.signupUser)
);

router
    .route("/login")
    .get(usercontroller.renderLogin)
    .post(
        saveRedirectUrl,
        passport.authenticate("local",{ 
        failureRedirect: '/login', 
        failureFlash: true }),
        usercontroller.loginUser);

router.get("/logout", usercontroller.logoutUser);

module.exports=router;