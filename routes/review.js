const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync');
const { validateReview, isLoggedIn, isreviewAuthor } = require("../middleware");
const reviewcontroller = require("../controllers/reviews");

//reviews 
//post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewcontroller.postReview));

//delete review route
router.delete("/:reviewId", isLoggedIn, isreviewAuthor, wrapAsync(reviewcontroller.destroyReview));

module.exports=router;