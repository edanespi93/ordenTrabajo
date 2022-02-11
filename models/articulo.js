const { Schema, model } = require("mongoose");

const articuloShema = Schema({
  equipo: {
    type: String,
    required: [true, "Nombre del equipo es obligatorio"],
  },
  marca: {
    type: String,
    required: [true, "Marca es obligatoria"],
  },
  modelo: {
    type: String,
  },
  serie: {
    type: String,
  },
  observaciones: {
    type: String,
    required: [true, "Observaciones son obligatorias"],
  },
  estado: {
    type: Boolean,
    default: false,
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
  },
});

module.exports = model("Articulo", articuloShema);
