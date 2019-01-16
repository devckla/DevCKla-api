const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");

// Call routes files
const users = require("./api/routes/users");
const profile = require("./api/routes/profile");

const app = express();

// Use Morgan for logging
app.use(morgan("dev"));

// Get db URI
const db = process.env.DB_LOCAL; /* To be used in development environment */
// const db = process.env.DB_URI; /* To be used in production environment */

// Make connection to db
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to the db"))
  .catch(err => console.log(err));

// Set body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Initialze passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Declare routes path
app.use("/api/auth", users);
app.use("/api/profile", profile);

// Declare port number
const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is running"));
