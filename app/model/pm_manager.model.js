

module.exports.getConnection=function(){

    const mysql = require('mysql');

    let config = {
        host     : 'localhost',
        user     : 'pm_manager',
        password : 'Covid-19',
        database : 'pm_projects',
        insecureAuth : true
    };

    return mysql.createConnection(config);
}


module.exports.getEnCrypted = async function(str){
    const bcrypt = require('bcrypt');

    const saltRounds = await bcrypt.genSaltSync(13);

    return bcrypt.hashSync(str, saltRounds);
}

module.exports.isCorrectPassword = async function(myPlaintextPassword,hash){
    const bcrypt = require('bcrypt');

    return bcrypt.compareSync(myPlaintextPassword, hash);

}

module.exports.createWebToken = (id) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign( id  , 'dawdiw', {
        expiresIn: 60 * 60 * 24
    });
}