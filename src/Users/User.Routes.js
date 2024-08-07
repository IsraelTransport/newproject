const express = require('express');
const { checkUserCredentials, listAllUsers,patchUserEmail, getUserIDByUsername, createUser, deleteUser, GetUserByID, editUser } = require('./Users.Controller');
const router = express.Router();

router.post('/Login', checkUserCredentials);
router.post('/SignUp', createUser); // New route to create a user
router.get('/GetAllUsers', listAllUsers);
router.get('/GetUserByID/:userID', GetUserByID); // Change the route to include the userID as a URL parameter
router.get('/GetUserIDByUsername/:username', getUserIDByUsername);  // Ensure this line is present
router.delete('/DeleteUser/:userID', deleteUser);
router.put('/EditUser/:userID', editUser); // New route to edit a user
router.patch('/PatchUserEmail/:userID', patchUserEmail); // New route to patch email

module.exports = router;
