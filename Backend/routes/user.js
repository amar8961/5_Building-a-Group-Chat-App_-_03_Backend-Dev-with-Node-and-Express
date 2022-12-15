const express = require('express');

const usersController = require('../controllers/user');

const router = express.Router();

router.post('/users', usersController.createUser)

module.exports=router;