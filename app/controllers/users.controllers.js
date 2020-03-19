const model = require('../model/pm_manager.model');



exports.isValidUser = async (req, res) => {
    const connection = await model.getConnection();
    
    connection.connect(async err => {
        if (!err) {
            
            
            let sql = `SELECT * FROM Usuarios WHERE nickname ='${req.body.nickname}'`;
            connection.query(sql, async (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
            
                if (results.length){
                    let isCorrect = await model.isCorrectPassword(req.body.password,results[0].password);
                    if (isCorrect){
                        console.log(" User Autenticado ");
                        
                        let webToken = model.createWebToken({id:results[0].id});
                        console.log(webToken);

                        // Creamos el objeto usuario 
                        // uno de los campos del usuario es el token
                        let usuario ={
                            id:results[0].id,
                            nombre:results[0].nombre,
                            apellidos:results[0].apellidos,
                            nickname:results[0].nickname,
                            avatar:results[0].avatar,
                            admin:results[0].admin,
                            token:webToken
                        }

                        res.send(usuario);
                    }
                    res.send(results);
                }else{
                    res.send({msg:"Usuario no valido"});
                }
                
                
            });
        } else {
            console.log(
                "Database connectie niet gelukt!  : " +
                    JSON.stringify(err, undefined, 2)
            );
        }
    });




    const user = req.body;
    console.log(user);
    //res.send(user);
};


exports.isValidToken = async (req, res) => {
    console.log(req.body.token);
    console.log("hola");
    res.send({token:true});
};