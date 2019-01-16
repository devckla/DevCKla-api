const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Load the user model
const User = require("../../models/User");

// Load JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

exports.loging = (req, res) => {
  const password = req.body.password;
  User.findOne({ email: req.body.email }).then(user => {
    // If the email is not in the data base
    if (!user) {
      return res.status(400).json({ msg: "Wrong login credentials." });
    }
    // If the email is in the data base
    bcrypt.compare(password, user.password).then(isMatch => {
      // If passwords match
      if (isMatch) {
        // Create jwt payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign the jwt and generate the token
        jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          const response = {
            token: "Bearer " + token,
            message: "User successfully created."
          };
          return res.status(200).json(response);
        });
      }
      // If passwords don't match
      else {
        return res.status(400).json({ msg: "Wrong login credentials" });
      }
    });
  });
};
