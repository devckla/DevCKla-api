const Profile = require('../models/Profile');

const createProfile = async (req, res) => {
	if (req.user === null) {
		const response = {
			message: 'Unauthorised',
			status: 401
		};

		return res.status(401).json(response);
	} else {
		const userProfile = {
			name: req.body.name,
			email: req.body.email,
			phoneNumber: req.body.phone || '',
			sex: req.body.sex,
			languages: req.body.languages,
			frameWorks: req.body.frameWorks,
			tools: req.body.tools,
			communities: req.body.communities,
			socialLinks: req.body.socialLinks,
			location: req.body.location
		};

		const profile = new Profile();

		await profile.addProfile(uid, userProfile).catch(error => {
			const response = {
				message: 'Error occured',
				error,
				status: 400
			};

			return res.status(400).json(response);
		});

		const response = {
			message: 'Profile added',
			status: 201
		};

		return res.status(201).json(response);
	}
};

module.exports = createProfile;
