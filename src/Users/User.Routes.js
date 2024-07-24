const express = require('express');
const { checkUserCredentials, listAllUsers, createUser } = require('./Users.Controller');
const router = express.Router();

router.post('/login', checkUserCredentials);
router.post('/signup', createUser); // New route to create a user
router.get('/', listAllUsers);

module.exports = router;
