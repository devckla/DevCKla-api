const Validate = require("validator");

// Load isEmpty file
const isEmpty = require("./isEmpty");

module.exports = validateResetInput = data => {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Check if password is empty
  if (Validate.isEmpty(data.password)) {
    errors.password = "Password field can not be left empty.";
  }

  // Check if password is of required length
  if (!Validate.isLength(data.password, { min: 8 })) {
    errors.password = "Password must have at least 8 characters.";
  }

  // Check if password is matching with second password
  if (!Validate.equals(data.password2, data.password)) {
    errors.password2 = "Passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
