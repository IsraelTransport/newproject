const express = require('express');
const { checkUserCredentials, listAllUsers, createUser } = require('./Users.Controller');
const router = express.Router();

router.post('/Login', checkUserCredentials);
router.post('/SignUp', createUser); // New route to create a user
router.get('/GetAllUsers', listAllUsers);

module.exports = router;
