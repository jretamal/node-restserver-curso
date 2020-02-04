/*
 * ARCHIVO DE CONFIGURACION DEL SERVIDOR, PRODUCCION Y DESARROLLO
 */

// === PUERTO MONGODB
process.env.PORT = process.env.PORT || 3000;

// === ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// === BASE DE DATOS

let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/cafe";
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// === SEED TOKEN
process.env.SEED = process.env.SEED || "secret-1";

// === FECHA VENCIMIENTO
// 60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
