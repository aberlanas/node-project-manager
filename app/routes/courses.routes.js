const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {getAllCourses} = require("../controllers/courses.controllers");

router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/getAllCourses',passport.authenticate('jwt', { session: false }), getAllCourses);

module.exports = router