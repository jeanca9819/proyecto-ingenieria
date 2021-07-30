const { Router } = require('express');
const express = require('express');
const router = express.Router();

const controller = require('../controller/UsuarioController');

router.get('/login/:correo/:contrasenna/', controller.login);

router.get('/clasificadores/', controller.clasificadores);

router.post('/ingresarBoleta',controller.ingresarBoleta);

router.post('/download', controller.descargarArchivo);

router.get('/listarBoletas/:idUsuario/:permiso/', controller.listarBoletas);

router.get('/boletaById/:idBoleta/', controller.boletaById);

router.get('/respuestaById/:idRespuesta/', controller.respuestaById);

router.post('/ingresarRespuesta',controller.ingresarRespuesta);

module.exports = router;
