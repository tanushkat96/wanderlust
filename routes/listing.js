const express=require("express");
const router=express.Router();
const wrapAsync=require('../utils/wrapAsync');
const { isLoggedIn, isOwner, validateListing }= require("../middleware");
const listingcontroller= require("../controllers/listing");
const multer  = require('multer');
const {storage}= require('../cloudConfig');
const upload = multer({ storage  });


router
    .route("/")
    .get(wrapAsync(listingcontroller.index))
    .post(
        validateListing,
        isLoggedIn,
        upload.single('listing[image]'),
        wrapAsync(listingcontroller.createListing)
    );
   

//new route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingcontroller.showListing))
    .put(
        validateListing,
        isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'),
        wrapAsync(listingcontroller.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(listingcontroller.deleteListing));

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingcontroller.editForm));

module.exports=router;