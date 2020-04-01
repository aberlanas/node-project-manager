const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {findAllTechs} = require("../controllers/techs.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/findAllTechs',passport.authenticate('jwt', { session: false }), findAllTechs);
module.exports = router