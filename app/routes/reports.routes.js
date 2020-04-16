const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {reportAllProjects,reportAllProjectsHTML} = require("../controllers/reports.controllers");

router.get('/reportAllProjects',passport.authenticate('jwt', { session: false }), reportAllProjects);
router.get('/reportAllProjectsHTML',reportAllProjectsHTML);
//router.get('/reportAllProjects', reportAllProjects);


module.exports = router