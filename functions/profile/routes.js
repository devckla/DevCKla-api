const router = require('express').Router();

const createProfile = require('./controllers/createProfile');

router.post('/create', createProfile);

module.exports = router;
