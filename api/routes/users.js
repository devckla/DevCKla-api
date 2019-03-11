const express = require("express");
const router = express.Router();

const User = require("../models/User");

const testing = require("../controllers/testing").testing;
const register = require("../controllers/users/register").register;
const login = require("../controllers/users/login").loging;
const forgot = require("../controllers/users/forgot").forgot;
const reset = require("../controllers/users/reset").reset;

// @route  GET /auth/testing
// @desc   Testing the routing
// @access Public
router.get("/testing", testing);

// @route  POST /auth/register
// @desc   Allow someone to register
// @access Public
router.post("/register", register);

// @route  POST /auth/login
// @desc   Allow a user to login
// @access Public
router.post("/login", login);

// @route  POST /auth/forgot
// @desc   Allow a user to reset their password
// @access Public
router.get("/forgot", forgot);

// @route  POST /auth/login
// @desc   Allow a user to login
// @access Protected
router.get("/reset/:token", reset);

// @route  DELETE /auth/delete
// @desc   Delete all users created during testing
// @access Protected
router.delete("/delete", (req, res) => {
	User.remove({})
		.then(() => {
			console.log("Done");
		})
		.catch(err => {
			console.log(err);
		});
});

module.exports = router;
