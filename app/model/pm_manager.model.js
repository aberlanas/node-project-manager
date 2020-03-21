const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getConnection = () => {
    const mysql = require("mysql");

    let config = {
        host: "localhost",
        user: "root",
        password: "",
        database: "pm_projects",
        insecureAuth: true
    };

    return mysql.createConnection(config);
};

const getEnCrypted = (str) => {
    const saltRounds = bcrypt.genSaltSync(13);
    return bcrypt.hashSync(str, saltRounds);
};

const isCorrectPassword = (myPlaintextPassword, hash) => {
    return bcrypt.compareSync(myPlaintextPassword, hash);
};

const createWebToken = id => {
    /* It's Magic! */
    return jwt.sign(id, "dawdiw", {
        expiresIn: 60 * 60 * 24
    });
};

const verifyToken = token => {
    return jwt.verify(token, "dawdiw", (err, decoded) => decoded);
};

module.exports = {
    getConnection,
    getEnCrypted,
    isCorrectPassword,
    createWebToken,
    verifyToken
}