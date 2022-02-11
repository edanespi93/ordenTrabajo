const { Schema, model } = require("mongoose");

const detalleShema = Schema({
  f_recepcion: {
    type: Date,
    required: [true, "Nombre del equipo es obligatorio"],
  },
  f_estimada_entrega: {
    type: Date,
  },

  articulo: {
    type: Schema.Types.ObjectId,
    ref: "Articulo",
    required: true,
  },
});

module.exports = model("Detalle", detalleShema);
