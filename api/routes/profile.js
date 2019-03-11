const express = require("express");
const router = express.Router();
const passport = require("passport");

const testing = require("../controllers/profile/testing");
const createProfile = require("../controllers/profile/createProfile")
	.createProfile;
const updateProfile = require("../controllers/profile/updateProfile")
	.updateProfile;

// @route  GET /profile/testing
// @desc   Testing the routing
// @access Public
router.get("/testing", testing.testing);

// @route  GET /profile/create
// @desc   Create a user profile
// @access Protected
router.post(
	"/create",
	passport.authenticate("jwt", { session: false }),
	createProfile
);

// @route  GET /profile/update
// @desc   Update a user profile
// @access Protected
router.patch(
	"/update",
	passport.authenticate("jwt", { session: false }),
	updateProfile
);

module.exports = router;
