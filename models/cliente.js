const { Schema, model } = require("mongoose");

const clienteShema = Schema({
  nombres: {
    type: String,
    required: [true, "Nombres son obligatorios"],
  },
  cedula: {
    type: String,
    required: [true, "Cedula es obligatoria"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email es obligatorio"],
    unique: true,
  },
  telefono: {
    type: String,
    required: [true, "Telefono es obligatorio"],
  },
  direccion: {
    type: String,
  },
 
});

module.exports = model("Cliente", clienteShema);
