const admin = require('firebase-admin');

const creds = require('../config.json');

admin.initializeApp({
	credential: admin.credential.cert(creds),
	databaseURL: 'https://devckla-api.firebaseio.com'
});

const firestore = admin.firestore();

module.exports = { firestore, admin };
