const express = require("express");
const route = express.Router();

const testing = require("../controllers/profile/testing");

route.get("/testing", testing.testing);

module.exports = route;
