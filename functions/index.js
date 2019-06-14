const functions = require('firebase-functions');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./middleware/auth');

const app = express();

app.use(helmet());
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

const profile = require('./profile/routes');

app.use('/profile', profile);

exports.devckla = functions.https.onRequest(app);
