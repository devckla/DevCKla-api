// Load user model
const User = require("../../models/User");

exports.forgot = (req, res) => {
  User.find({ email: req.body.email })
    .then(user => {
      // If the user does exist
      if (user) {
        return res
          .status(200)
          .json({ msg: "Email has been sent to reset password." });
      }
      // If the user does not exist
      else {
        return res
          .status(400)
          .json({ msg: "The email does not have an account." });
      }
    })
    .catch(err => console.log(err));
};
