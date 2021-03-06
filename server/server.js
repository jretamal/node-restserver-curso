//
// APLICACION REST EN NODEJS + MONGODB
//

require("./config/config");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// parse application/json
app.use(bodyParser.json());

// Configuracion glboal de rutas
app.use(require("./routes/index"));

// mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
//     if (err) throw err;
//     console.log('Base de datos ONLINE.');
// });

mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (err, res) => {
    if (err) throw err;
    console.log("Base de datos ONLINE.");
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Escuchando puerto ${process.env.PORT}`);
  console.log(`VARIABLE ENTORNO NODE_ENV ${process.env.NODE_ENV}`);
});
