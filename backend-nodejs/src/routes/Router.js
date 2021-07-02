const { Router } = require('express');
const express = require('express');
const router = express.Router();

const controller = require('../controller/UsuarioController');

router.get('/login/:correo/:contrasenna/', controller.login);

router.get('/clasificadores/', controller.clasificadores);

router.post('/ingresarBoleta',controller.ingresarBoleta);

router.get('/listarBoletas/:idUsuario/:permiso/', controller.listarBoletas);

module.exports = router;
