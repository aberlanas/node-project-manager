const express      = require("express");
const path         = require("path");
const cors         = require("cors");
const passport     = require('passport');
const session      = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware for passport
require('./config/passport');

// Middlewares
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(cookieParser());

// Para enviar un FORM a traves de req. tal.
// Para que solo puedas pasar archivos texto plano 
// a traves de la URL. Gracias Carlos.
app.use(express.urlencoded({ extended: false }));

app.use(session({ 
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, "public")));

// Require Users routes
app.use("/api", require("./app/routes/users.routes.js"));

app.listen(3000, () => {
    console.log(" * Miniserver UP and Running en http://localhost:3000");
});
