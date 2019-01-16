const express = require("express");
const router = express.Router();
const passport = require("passport");

const testing = require("../controllers/profile/testing");
const createProfile = require("../controllers/profile/createProfile")
  .createProfile;

// @route  GET /api/profile/testing
// @desc   Testing the routing
// @access Public
router.get("/testing", testing.testing);

// @route  GET /api/profile/create
// @desc   Create a user profile
// @access Protected
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createProfile
);

module.exports = router;
