const { firestore } = require('../../config/firebase');

class Profile {
	constructor() {
		this.profile = firestore.collection('Profiles');
	}

	addProfile(uid, profile) {
		return this.profile.doc(uid).set(profile);
	}

	getProfile(uid) {
		return this.profile.doc(uid).get();
	}
}

module.exports = Profile;
