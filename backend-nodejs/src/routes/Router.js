const { Router } = require('express');
const express = require('express');
const router = express.Router();

const controller = require('../controller/UsuarioController');

router.get('/login/:correo/:contrasenna/', controller.login);

router.get('/clasificadores/', controller.clasificadores);

router.get('/departamentos/', controller.departamentos);

router.get('/todosReportes/', controller.todosReportes);

router.get('/reportesParametro/:identificador/:filtro1/:filtro2/', controller.reportesParametro);

router.post('/ingresarBoleta',controller.ingresarBoleta);

router.post('/download', controller.descargarArchivo);

router.get('/listarBoletas/:idUsuario/:permiso/', controller.listarBoletas);

router.get('/listarMensual/:departamentoId/', controller.listarMensual);

router.get('/boletaById/:idBoleta/', controller.boletaById);

router.get('/respuestaById/:idRespuesta/', controller.respuestaById);

router.post('/ingresarRespuesta',controller.ingresarRespuesta);

module.exports = router;
