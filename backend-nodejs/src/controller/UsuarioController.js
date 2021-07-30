const db_conection  = require('../config/database.js');
const path = require('path');

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

exports.listarMensual = (req, res) => {

    const { departamentoId } = req.params;

    db_conection.sql.connect(db_conection.config, function (err) {

        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "exec [dbo].[mensualPorDepartamento] '" + departamentoId +"';", function (err, result) {
                
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

exports.departamentos = (req, res) => {
    db_conection.sql.connect(db_conection.config, function (err) {    
        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "exec [dbo].[obtenerDepartamentos]", function (err, result) {
                
                if (err) {
                    console.log(err);
                } else {                            
                     res.json(result.recordset);
                   
                }
            });
        }
  
    });
};

exports.todosReportes = (req, res) => {
    db_conection.sql.connect(db_conection.config, function (err) {    
        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "exec [dbo].[obtenerTodosReportes]", function (err, result) {
                
                if (err) {
                    console.log(err);
                } else {                            
                     res.json(result.recordset);
                   
                }
            });
        }
  
    });
};

exports.reportesParametro = (req, res) => {

    const { identificador } = req.params;

    const { filtro1 } = req.params;

    const { filtro2 } = req.params;

    db_conection.sql.connect(db_conection.config, function (err) {

        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "exec [dbo].[obtenerReportes] '" + identificador+ "','" + filtro1 + "','" + filtro2 + "';", function (err, result) {
                
                if (err) {
                    console.log(err);
                } else {
                    res.json(result.recordset);
                }
            });
        }
  
    });
};

exports.boletaById = (req, res) => {

    const { idBoleta } = req.params;

    db_conection.sql.connect(db_conection.config, function (err) {

        if (err) {
            console.log(err);
        }else{

            db_conection.sql.query(
                
                "exec [dbo].[obtenerBoleta] '" + idBoleta + "';", function (err, result) {
                
                if (err) {
                    console.log(err);
                } else {
                    res.json([[result.recordsets[0]]]);
                }
            });
        }
  
    });
};

exports.respuestaById = (req, res) => {

    const { idRespuesta } = req.params;

    db_conection.sql.connect(db_conection.config, function (err) {

        if (err) {
            console.log(err);
        }else{

            db_conection.sql.query(
                
                "exec [dbo].[obtenerRespuesta] '" + idRespuesta + "';", function (err, result) {
                
                if (err) {
                    res.json("No existe respuesta");
                } else {
                    res.json([[result.recordsets[0]]]);
                }
            });
        }
  
    });
};

exports.ingresarBoleta = (req, res) => {

    const { usuarioId, asuntoDetallado, ipComputadora, clasificador, rutaArchivo } = req.body;

    db_conection.sql.connect(db_conection.config, function (err) {

        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "exec [dbo].[ingresarBoleta] '" + usuarioId + "','" + asuntoDetallado + "','" + ipComputadora + "','" + clasificador + "','" + rutaArchivo + "';", function (err, result) {
                
                if (err) {  
                    console.log(err);
                } else {
                    res.json('Ingreso Correcto');
                }
            });
        }
  
    });
};

exports.descargarArchivo = (req, res) => {
    
    if (req.body.filename != null) {
        filepath = path.join(__dirname,'/../assets') + '/' + req.body.filename;
        res.sendFile(filepath);
    }
};

exports.ingresarRespuesta = (req, res) => {

    const { idBoleta, idUsuarioRespuesta, ipComputadora, detalleRespuesta, rutaArchivo } = req.body;

    db_conection.sql.connect(db_conection.config, function (err) {

        if (err) {
            console.log(err);
        }else{
                        
            db_conection.sql.query(
                
                "exec [dbo].[insertarRespuesta] '" + detalleRespuesta + "','" + idUsuarioRespuesta + "','" + ipComputadora + "','" + idBoleta + "','" + rutaArchivo + "';", function (err, result) {
                
                if (err) {  
                    console.log(err);
                } else {
                    res.json('Ingreso Correcto');
                }
            });
        }
  
    });
};