const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {findAllTechs, createTech, getUsersTech, getTechById} = require("../controllers/techs.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/findAllTechs',passport.authenticate('jwt', { session: false }), findAllTechs);
router.post('/createTech'  ,passport.authenticate('jwt', { session: false }), createTech);
router.get('/getUsersTech/:idTech'  ,passport.authenticate('jwt', { session: false }), getUsersTech);
router.get('/getTechById/:id'  ,passport.authenticate('jwt', { session: false }), getTechById);
router.get('/prueba/:id', getTechById);


//router.post('/uploadTech',passport.authenticate('jwt', { session: false }), uploadTech);// -> RUTA AL FICHERO

module.exports = router