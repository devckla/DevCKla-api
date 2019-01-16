const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Load User input validation file
const Validate = require("../../validation/register");

// Load the user model
const User = require("../../models/User");

// Load JWT Sercret key
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = (req, res) => {
  // Validate user input
  const { errors, isValid } = Validate(req.body);

  // Check if the input is valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    // If the user exists
    if (user) {
      errors.email = "Email already exists.";
      return res.status(400).json(errors);
    }
    // If the user doesn't exist
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Generate salt
      bcrypt.genSalt(10, (err, salt) => {
        // Hash password and salt it
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          // Change password to the hashed version
          newUser.password = hash;

          // Save the new User
          newUser
            .save()
            .then(user => {
              // Create json web token payload
              const payload = {
                id: user.id,
                name: user.name
              };
              // Generate token
              jwt.sign(
                payload,
                JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) throw err;
                  const response = {
                    token: "Bearer " + token,
                    msg: "User has signed up."
                  };

                  return res.status(201).json(response);
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
};
