const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {reportAllProjects} = require("../controllers/reports.controllers");

router.post('/reportAllProjects',passport.authenticate('jwt', { session: false }), reportAllProjects);
//router.get('/reportAllProjectsHTML',reportAllProjectsHTML);
//router.get('/reportAllProjects', reportAllProjects);


module.exports = router