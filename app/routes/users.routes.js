const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const Model = require("../model/pm_manager.model")
const {findAllUsers, createUser, deleteUser, getUserById, updateUser} = require("../controllers/users.controllers");

const optsCookie = {
	expires: new Date(Date.now() + 3600000),
	secure: false, // set to true if your using https
	httpOnly: true
}

router.post("/logIn", (req, res, next) => {
    passport.authenticate("local-login", { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(400).send(info)
        }
        req.logIn(user, error => {
            const token = Model.createWebToken({
                id: user.id,
            })
			res.cookie("jwt", token, optsCookie);
            res.status(200).send(info)
        })
    })(req, res, next)
})

router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/profile', (req, res) => {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err || !user) {
			console.log(err);
			console.log(user);
			return res.status(401).send({ auth: false, message: 'No valid token' });
		}
		res.status(200).send({
			auth: true,
			user
		})
	})(req, res)
});

router.get('/logOut', (req, res) => {
	res.clearCookie('jwt');
	return res.status(200).send({ logOut: true });
})

router.get('/getAllUsers',passport.authenticate('jwt', { session: false }), findAllUsers )

router.post('/createUser',passport.authenticate('jwt', { session: false }), createUser )

router.delete('/deleteUser/:id',passport.authenticate('jwt', { session: false }), deleteUser )

router.put('/updateUser/:id',passport.authenticate('jwt', { session: false }), updateUser )

router.get('/getUserById/:id',passport.authenticate('jwt', { session: false }), getUserById )


module.exports = router
