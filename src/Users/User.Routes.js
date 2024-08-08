const express = require('express');
const { checkUserCredentials, listAllUsers,patchUserEmail, getUserIDByUsername, createUser, deleteUser, GetUserByID, editUser } = require('./Users.Controller');
const router = express.Router();

router.post('/Login', checkUserCredentials);
router.post('/SignUp', createUser); 
router.get('/GetAllUsers', listAllUsers);
router.get('/GetUserByID/:userID', GetUserByID); 
router.get('/GetUserIDByUsername/:username', getUserIDByUsername); 
router.delete('/DeleteUser/:userID', deleteUser);
router.put('/EditUser/:userID', editUser); 
router.patch('/PatchUserEmail/:userID', patchUserEmail);

module.exports = router;
