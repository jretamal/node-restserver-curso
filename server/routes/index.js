/*
 * ARCHIVO DE DEFINCION DE RUTAS
 */

const express = require("express");
const app = express();

// Configuracion de routes
app.use(require("./usuario"));
app.use(require("./login"));

module.exports = app;
