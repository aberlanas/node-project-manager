const express = require("express");
const router = express.Router();
const passport = require("passport");

const Users = require("../controllers/users.controllers");
const Model = require("../model/pm_manager.model");

router.post("/users/isValidUser", function(req, res, next) {
  passport.authenticate("local-login", (error, user, info) => {
    if (info !== undefined) {
      res.send(info.message);
    } else {
      req.logIn(user, error => {
        const token = Model.createWebToken({
          id: user.id,
          nickname: user.nickname
        });
        res.cookie("token", token, {
          expires: new Date(Date.now() + 360000),
          secure: false, // set to true if your using https
          httpOnly: true
        });
        user.token = token;
        res.send(user);
      });
    }
  })(req, res, next);
});

router.post("/users/isValidToken", Users.isValidToken);
router.get("/users/whoAmI/:id", Users.whoAmI);

router.get("/users/profile", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user,info) => {
    console.log("ho");
    res.status(200).send(user);

  })(req, res, next);
});

/*
router.get("/users/profile", function(req, res, next) {
  passport.authenticate("jwt-login", { session: false }),
    function(req, res) {
      console.log("profile");
      res.send({ true: true });
    }(req, res, next);
});
*/

module.exports = router;
