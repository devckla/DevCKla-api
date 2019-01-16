// Load the Profile model
const Profile = require("../../models/Profile");

// Load the user model
const User = require("../../models/User");

exports.createProfile = (req, res) => {
  // Collect user input
  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.programmingLang = req.body.programmingLang;
  profileFields.phoneNumber = req.body.phoneNumber;
  profileFields.gender = req.body.gender;
  if (req.body.affiliatedCommunities)
    profileFields.affiliatedCommunities = req.body.affiliatedCommunities;
  if (req.body.githubUsername)
    profileFields.githubUsername = req.body.githubUsername;
  if (req.body.website) profileFields.website = req.body.website;

  // Social media links
  profileFields.social = {};
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.stackoverflow)
    profileFields.social.stackoverflow = req.body.stackoverflow;

  // Save the users profile
  new Profile(profileFields)
    .save()
    .then(profile => {
      const response = {
        profile: profile,
        msg: "Profile created"
      };
      return res.status(201).json(response);
    })
    .catch(err => console.log(err));
};
