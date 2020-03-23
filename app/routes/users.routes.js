const express = require('express');
const router = express.Router();
const passport = require('passport');

const Users = require('../controllers/users.controllers');

router.post('/users/isValidUser', function (req,res,next){
    passport.authenticate('local-login',(error,user,info)=>{
        
    })(req,res,next);
});
router.post('/users/isValidToken', Users.isValidToken);
router.get('/users/whoAmI/:id', Users.whoAmI);


module.exports=router;
