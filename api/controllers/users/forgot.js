const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Load user model
const User = require("../../models/User");

exports.forgot = (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
  });

  User.find({ email: req.body.email })
    .then(user => {
      // If the user does exist
      if (user) {
        jwt.sign(
          { email: req.body.email },
          JWT_SECRET,
          { expiresIn: 7200 },
          (err, token) => {
            if (err) throw err;
            const mailOptions = {
              from: "Kengo Wada <louiskengo3@gmail.com>",
              to: req.body.email,
              subject: "Reset Account Password",
              html: `<h1>Reset password for this account.</h1><br>
              <a href="${process.env.URL}/auth/${token}">Click this link</a>
              `
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) throw err;
              const response = {
                message: "Email has been sent.",
                info: info
              };

              return res.status(200).json(response);
            });
          }
        );
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
