const Validate = require("validator");

// Load is empty validator
const isEmpty = require("./isEmpty");

module.exports = ValidateRegisterInput = data => {
	let errors = {};

	// Make all missing data strings since 'validate' only works with strings
	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	// Chech if name is empty
	if (Validate.isEmpty(data.name)) {
		errors.name = "Name field can not be left empty.";
	}

	// Check if name has less than 3 characters
	if (!Validate.isLength(data.name, { min: 3, max: 35 })) {
		errors.name = "Name must have at least 3 characters and 35 at most.";
	}

	// Check if email is empty
	if (Validate.isEmpty(data.email)) {
		errors.email = "Email field can not be left empty.";
	}

	// Check if email has a valid format
	if (!Validate.isEmail(data.email)) {
		errors.email = "Enter a valid email addresss.";
	}

	// Check if password is empty
	if (Validate.isEmpty(data.password)) {
		errors.password = "Password field can not be left empty.";
	}

	// Check if password is of required length
	if (!Validate.isLength(data.password, { min: 8 })) {
		errors.password = "Password must have at least 8 characters.";
	}

	// Check if password is matching with second password
	// if (!Validate.equals(data.password2, data.password)) {
	// 	errors.password2 = "Passwords must match.";
	// }

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
