const db_conection  = require('../config/database.js');

exports.login = (req, res) => {

    const { correo } = req.params;

    const { contrasenna } = req.params;

    db_conection.sql.connect(db_conection.config, function (err) {

        
        
        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "DECLARE @existeUsuario bit; exec [dbo].[existeUsuario] '" + correo+ "','" + contrasenna+"', @existeUsuario output; select @existeUsuario as existeUsuario", function (err, result) {
                
                if (err) {
                    console.log(err);
                } else {
                    if (!result.recordset[0].existeUsuario){
                        res.json('No existe');
                    }else{
                      
                     res.json('Si existe');
                    }
                }
            });
        }
  
    });
};
