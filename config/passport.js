const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

const Usuarios = require('../app/controllers/users.controllers');
    
passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await Usuarios.findById(id);
    done(null, user);
})

passport.use('local-login', new LocalStrategy({
    usernameField: 'nickname',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,nickname, password, done) => {
    const user = await Usuarios.findByNickname(nickname);
    // TODO
    console.log(user);
}));    