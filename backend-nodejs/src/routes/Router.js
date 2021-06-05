const { Router } = require('express');
const express = require('express');
const router = express.Router();

const controller = require('../controller/UsuarioController');

router.get('/login/:correo/:contrasenna/', controller.login);

module.exports = router;
