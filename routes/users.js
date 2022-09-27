var express = require('express');
var router = express.Router();
const users = require('../controller/user.controller');
const { authVerify } = require("../auth");

//To get the all users
router.get('/', users.findAll);

//To get the user with user Id
router.get('/:id', users.findById);

//To get the user with user Id
router.get('/user/:id', users.findUserById);

//To create a new user 
router.post('/register', users.create);

//To login a user
router.post('/login', users.login);

//To edit the user with id
router.put('/:id', authVerify, users.updateUserWithId);

//To delete the user with id
router.delete('/:id', authVerify, users.deleteUserWithId);

module.exports = router;

