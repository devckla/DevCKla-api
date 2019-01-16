const express = require("express");
const router = express.Router();

const testing = require("../controllers/testing").testing;
const register = require("../controllers/users/register").register;
const login = require("../controllers/users/login").loging;
const forgot = require("../controllers/users/forgot").forgot;

// @route  GET /api/auth/testing
// @desc   Testing the routing
// @access Public
router.get("/testing", testing);

// @route  POST /api/auth/register
// @desc   Allow someone to register
// @access Public
router.post("/register", register);

// @route  POST /api/auth/login
// @desc   Allow a user to login
// @access Public
router.post("/login", login);

// @route  POST /api/auth/login
// @desc   Allow a user to login
// @access Public
router.post("/forgot", forgot);

module.exports = router;
