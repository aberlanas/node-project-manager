const express = require('express');
const router = express.Router();

const Users = require('../controllers/users.controllers');


router.get('/users/isValidUser',Users.isValidUser);
//router.get('/users/isValidUser',createUser);

module.exports=router;
