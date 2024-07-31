const express = require('express');
const { checkUserCredentials, listAllUsers,getUserIDByUsername, createUser, GetUserByID } = require('./Users.Controller');
const router = express.Router();

router.post('/Login', checkUserCredentials);
router.post('/SignUp', createUser); // New route to create a user
router.get('/GetAllUsers', listAllUsers);
router.get('/GetUserByID/:userID', GetUserByID); // Change the route to include the userID as a URL parameter
router.get('/GetUserIDByUsername/:username', getUserIDByUsername);  // Ensure this line is present
module.exports = router;
