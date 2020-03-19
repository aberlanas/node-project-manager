const express = require('express');
const router = express.Router();

const Users = require('../controllers/users.controllers');

router.post('/users/isValidUser', Users.isValidUser);
router.post('/users/isValidToken', Users.isValidToken);

module.exports=router;
