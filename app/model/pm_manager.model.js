const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getConnection = async () => {

    const mysql = require("mysql2/promise");

    let config = {
        host: "localhost",
        user: "pm_manager",
        password: "Covid-19",
        database: "pm_projects",
        insecureAuth: true
    };

    return await mysql.createConnection(config);
};

const getEnCrypted = (str) => {
    const saltRounds = bcrypt.genSaltSync(13);
    return bcrypt.hashSync(str, saltRounds);
};

const isCorrectPassword = (myPlaintextPassword, hash) => {
    return bcrypt.compareSync(myPlaintextPassword, hash);
};

const createWebToken = payload => {
    /* It's Magic! */
    return jwt.sign(payload, "dawdiw", {
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