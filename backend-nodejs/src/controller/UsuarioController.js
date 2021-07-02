const db_conection  = require('../config/database.js');

exports.login = (req, res) => {

    const { correo } = req.params;

    const { contrasenna } = req.params;

    db_conection.sql.connect(db_conection.config, function (err) {

        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "DECLARE @permiso bit, @idUsuario smallint; exec [dbo].[existeUsuario2] '" + correo+ "','" + contrasenna+"', @permiso output, @idUsuario output; select @idUsuario as idUsuario, @permiso as permiso", function (err, result) {
                
                if (err) {
                    console.log(err);
                } else {
                    res.json(result);
                }
            });
        }
  
    });
};

exports.listarBoletas = (req, res) => {

    const { idUsuario } = req.params;

    const { permiso } = req.params;

    db_conection.sql.connect(db_conection.config, function (err) {

        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "exec [dbo].[spListarBoletas] '" + idUsuario+ "','" + permiso+"';", function (err, result) {
                
                if (err) {
                    console.log(err);
                } else {
                    res.json([[result.recordsets[0]]]);
                }
            });
        }
  
    });
};

exports.clasificadores = (req, res) => {
    db_conection.sql.connect(db_conection.config, function (err) {    
        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "exec [dbo].[sp_clasificador]", function (err, result) {
                
                if (err) {
                    console.log(err);
                } else {                            
                     res.json(result.recordset);
                   
                }
            });
        }
  
    });
};

exports.ingresarBoleta = (req, res) => {

    const { usuarioId, asuntoDetallado, ipComputadora, clasificador } = req.body;

    db_conection.sql.connect(db_conection.config, function (err) {

        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "exec [dbo].[ingresarBoleta] '" + usuarioId + "','" + asuntoDetallado + "','" + ipComputadora + "','" + clasificador + "';", function (err, result) {
                
                if (err) {  
                    console.log(err);
                } else {
                    res.json('Ingreso Correcto');
                }
            });
        }
  
    });
};