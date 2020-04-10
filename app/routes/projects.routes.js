const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {findAllProjects, updateProject} = require("../controllers/projects.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/findAllProjects',passport.authenticate('jwt', { session: false }), findAllProjects);

router.post('/updateProject/:id',passport.authenticate('jwt', { session: false }), updateProject);

module.exports = router