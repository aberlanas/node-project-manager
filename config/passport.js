const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = 'dawdiw';


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
    passReqToCallback: true,
    session: false
}, async (req,nickname, password, done) => {
    const user = await Usuarios.findByNickname(nickname);
    done(null,user);
}));    

passport.use('jwt',new JwtStrategy(opts, function(jwt_payload, done) {
    console.log("A cara perro");
    console.log(jwt_payload);
    return done(null, null);
}));

/*
passport.use('local-login', new JwtStrategy(
    {session: false, usernameField: 'nickname', passwordField: 'password'},
    (err, user, info) => {
    
    
    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user   : user
        });
    }

    console.log(user);
    
    req.login(user, {session: false}, (err) => {
        if (err) {
            res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user, 'your_jwt_secret');
        return res.json({user, token});
        });
}));
*/
/*
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    const user = await Usuarios.findByNickname(nickname);
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
*/