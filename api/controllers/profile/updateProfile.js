// Load the profile model
const Profile = require("../../models/Profile");

// Load validation
const Validate = require("../../validation/updateProfile");

// Load user model
// const User = require("../../models/User");

exports.updateProfile = (req, res) => {
  const { errors, isValid } = Validate(req.body);

  if (isValid) {
    return res.status(400).json(errors);
  }

  const updateFields = {};
  if (updateFields.programmingLang)
    updateFields.programmingLang = req.body.programmingLang;
  if (updateFields.phoneNumber) updateFields.phoneNumber = req.body.phoneNumber;
  if (updateFields.gender) updateFields.gender = req.body.gender;
  if (req.body.affiliatedCommunities)
    updateFields.affiliatedCommunities = req.body.affiliatedCommunities;
  if (req.body.githubUsername)
    updateFields.githubUsername = req.body.githubUsername;
  if (req.body.website) updateFields.website = req.body.website;

  // Social media links
  updateFields.social = {};
  if (req.body.facebook) updateFields.social.facebook = req.body.facebook;
  if (req.body.twitter) updateFields.social.twitter = req.body.twitter;
  if (req.body.linkedin) updateFields.social.linkedin = req.body.linkedin;
  if (req.body.stackoverflow)
    updateFields.social.stackoverflow = req.body.stackoverflow;

  // Update the profile
  Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: updateFields },
    { new: true }
  )
    .then(profile => {
      const response = {
        profile: profile,
        msg: "Profile updated."
      };
      return res.status(201).json(response);
    })
    .catch(err => console.log(err));
};
