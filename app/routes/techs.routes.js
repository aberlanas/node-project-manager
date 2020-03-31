const express  = require("express")
const router   = express.Router()
const passport = require("passport")

router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})


router.get('/getAllTechs',passport.authenticate('jwt', { session: false }), (req,res) => {res.send([{tech:"JS"}])});
module.exports = router