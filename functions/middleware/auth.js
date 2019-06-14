const { admin } = require('../config/firebase');

const isAuthenticated = async (req, res, next) => {
	const token = req.get('Authorization');

	if (!token) {
		req.user = null;
		next();
		return 0;
	} else {
		const decodedToken = await admin
			.auth()
			.verifyIdToken(token)
			.catch(error => {
				req.user = null;
				next();
				return 0;
			});

		req.user = decodedToken.uid;
		next();
		return 1;
	}
};

module.exports = isAuthenticated;
