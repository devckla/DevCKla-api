const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Load user model
const User = require("../../models/User");

// Load validation file
const Validate = require("../../validation/register");

exports.reset = (req, res) => {
  if (req.params.token) {
    const token = req.params.token;

    // Decode token
    try {
      var decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      return res.status(200).json({ msg: "Reset time has expired." });
    }

    // Validate user input
    const { errors, isValid } = Validate(req.body);

    // Check if the input is valid
    if (!isValid) {
      return res.status(400).json(errors);
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        const updatePassword = {
          password: hash
        };
        User.findOneAndUpdate(
          { email: decoded_token.email },
          { $set: updatePassword }
        )
          .then(user => {
            const response = {
              msg: "Password successfully changed."
            };

            return res.status(201).json(response);
          })
          .catch(err => console.log(err));
      });
    });
  }
  // If no token is privided
  else {
    res.status(400).json("Invalid URL sent.");
  }
};
