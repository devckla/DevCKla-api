const Validate = require("validator");

// Load isEmpty file
const isEmpty = require("./isEmpty");

module.exports = validateUpdateProfile = data => {
  let errors = {};

  // If a certain field is not provided convert it to a string
  data.programmingLang = !isEmpty(data.programmingLang)
    ? data.programmingLang
    : "";
  data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.affiliatedCommunities = !isEmpty(data.affiliatedCommunities)
    ? data.affiliatedCommunities
    : "";
  data.githubUsername = !isEmpty(data.githubUsername)
    ? data.githubUsername
    : "";
  data.website = !isEmpty(data.website) ? data.website : "";
  data.facebook = !isEmpty(data.facebook) ? data.facebook : "";
  data.twitter = !isEmpty(data.twitter) ? data.twitter : "";
  data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : "";
  data.stackoverflow = !isEmpty(data.stackoverflow) ? data.stackoverflow : "";

  // Validate user input
  if (Validate.isURL(data.website)) {
    errors.website = "Invalid URL entered";
  }

  if (Validate.isURL(data.facebook)) {
    errors.website = "Invalid URL entered";
  }

  if (Validate.isURL(data.twitter)) {
    errors.website = "Invalid URL entered";
  }

  if (Validate.isURL(data.linkedin)) {
    errors.website = "Invalid URL entered";
  }

  if (Validate.isURL(data.stackoverflow)) {
    errors.website = "Invalid URL entered";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
