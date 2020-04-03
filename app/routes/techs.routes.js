const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {findAllTechs, createTech, uploadTech} = require("../controllers/techs.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/findAllTechs',passport.authenticate('jwt', { session: false }), findAllTechs);
router.post('/createTech'  ,passport.authenticate('jwt', { session: false }), createTech);

//router.post('/uploadTech',passport.authenticate('jwt', { session: false }), uploadTech);// -> RUTA AL FICHERO

module.exports = router