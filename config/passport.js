const passport = require('passport')
const LocalStrategy = require('passport-local')
const JwtStrategy = require("passport-jwt").Strategy

const Usuarios = require('../app/controllers/users.controllers')
const Model = require('../app/model/pm_manager.model')

passport.use('local-login', new LocalStrategy({
    usernameField: 'nickname',
    passwordField: 'password'
}, async (nickname, password, done) => {
    try {
        const user = await Usuarios.findByNickname(nickname)
        if (!user) {
            return done(null, false, { succes: false, message: `El usuario ${nickname} no existe.` })
        }
        if (!Model.isCorrectPassword(password, user.password)) {
            return done(null, false, { succes: false, message: `Las contraseña no es correcta.` })
        }
        done(null, { id: user.id }, { succes: true, message: 'El usuario ha sido logeado correctamente.' })
    }
    catch(error) {
        done(error, false, { succes: false, message: 'Problemas internos.' })
    }
}));    

const opts = {
    jwtFromRequest: (req) => req.cookies.jwt,
    secretOrKey: 'dawdiw'
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
    const user = await Usuarios.findById(payload.id)
    done(null, user)
}));
