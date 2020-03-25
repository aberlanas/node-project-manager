const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require("passport-jwt").Strategy;

const Usuarios = require('../app/controllers/users.controllers');

passport.use('local-login', new LocalStrategy({
    usernameField: 'nickname',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
}, async (req, nickname, password, done) => {
    const user = await Usuarios.findByNickname(nickname);
    done(null,user);
}));    

const opts = {
    jwtFromRequest: (req) => req.cookies.jwt,
    secretOrKey: 'dawdiw'
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
    console.log(payload);
    const user = await Usuarios.findById(payload.id);
    done(null, user);
}));
