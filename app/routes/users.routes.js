const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const Model = require("../model/pm_manager.model")
const {findAllUsers} = require("../controllers/users.controllers");

const optsCookie = {
	expires: new Date(Date.now() + 3600000),
	secure: false, // set to true if your using https
	httpOnly: true
}

router.post("/users/logIn", (req, res, next) => {
	// TODO verify user data

    passport.authenticate("local-login", { session: false }, (error, user, info) => {
        if (error || !user) {
            return res.status(400).send(info)
        }
        req.logIn(user, error => {
            const token = Model.createWebToken({
                id: user.id,
            })
			res.cookie("jwt", token, optsCookie)
            res.status(200).send(info)
        })
    })(req, res, next)
})

router.get('/users/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/users/profile', (req, res) => {
	passport.authenticate('jwt', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(401).send({ auth: false, message: 'No valid token' });
		}
		res.status(200).send({
			auth: true,
			user
		})
	})(req, res)
});

router.get('/users/logOut', (req, res) => {
	res.clearCookie('jwt');
	return res.status(200).send({ logOut: true });
})

router.get('/users/getAllUsers',passport.authenticate('jwt', { session: false }), findAllUsers )


module.exports = router
