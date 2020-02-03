const express = require("express");
const bcrypt = require("bcrypt");
const _ = require("underscore");
const app = express();

// Importamos el modelo usuario y lo asignamos al objeto Usuario
const Usuario = require("../models/usuario");

// Leer
app.get("/usuario", function(req, res) {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  let filtroEstadoActivo = {
    estado: true
  };

  Usuario.find(filtroEstadoActivo, "nombre email role estado google img")
    .skip(desde)
    .limit(5)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      Usuario.count(filtroEstadoActivo, (err, conteo) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        });
      });
    });
});

// Agregar
app.post("/usuario", function(req, res) {
  let body = req.body;

  //Creamos una instancia del esquema Usuario.
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  // Guardamos los datos recibidos por POST en la BBDD
  // err: En caso de un error
  // usuarioDB: Respuesta del usuario que se grabo en mongodb
  usuario.save((err, usuarioDB) => {
    if (err) {
      //Retornamos un JSON con el error.
      return res.status(400).json({
        ok: false,
        err
      });
    }

    //Retornamos un JSON con la respuesta del usuario guardado en BBDD
    // * No necesitamos poner el codigo 200 ya que esta implicito en el header.
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

// Actualizar
app.put("/usuario/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        //Retornamos un JSON con el error.
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );
});

// Borrar registro.
app.delete("/usuario/:id", function(req, res) {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true, runValidators: true },
    (err, usuarioDB) => {
      if (err) {
        //Retornamos un JSON con el error.
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );

  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
  //   if (err) {
  //     //Retornamos un JSON con el error.
  //     return res.status(400).json({
  //       ok: false,
  //       err
  //     });
  //   }

  //   if (!usuarioBorrado) {
  //     //Retornamos un JSON con el error.
  //     return res.status(400).json({
  //       ok: false,
  //       err: {
  //         message: "Usuario no encontrado"
  //       }
  //     });
  //   }

  //   res.json({
  //     ok: true,
  //     usuario: usuarioBorrado
  //   });
  // });
});

module.exports = app;
