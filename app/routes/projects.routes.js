const express  = require("express")
const router   = express.Router()
const passport = require("passport")

const {findAllProjectsByCourse,
		findAllProjects, 
		updateProject,
		updateKanbanProject, 
		createProject,
		deleteProject
	} = require("../controllers/projects.controllers");



router.get('/getAuth', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.status(200).send({ auth: true });
})

router.get('/findAllProjects',passport.authenticate('jwt', { session: false }), findAllProjects);
router.get('/findAllProjectsByCourse/:id',passport.authenticate('jwt', { session: false }), findAllProjectsByCourse);
router.post('/updateProject/:id',passport.authenticate('jwt', { session: false }), updateProject);
router.post('/updateKanbanProject/:id',passport.authenticate('jwt', { session: false }), updateKanbanProject);
router.post('/createProject',passport.authenticate('jwt', { session: false }), createProject);
router.get('/deleteProject/:id',passport.authenticate('jwt', { session: false }), deleteProject);


module.exports = router