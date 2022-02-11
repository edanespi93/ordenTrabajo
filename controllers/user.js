const { response } = require("express");
const Articulo = require("../models/articulo");
const Cliente = require("../models/cliente");
const Detalle = require("../models/detalle");

const newOrden = async (req, res = response) => {
  const {
    nombres,
    cedula,
    email,
    telefono,
    direccion,
    equipo,
    marca,
    observaciones,
    serie,
    nodelo,
  } = req.body;

  try {
    let searchCedula = await Cliente.findOne({ cedula });

    if (!searchCedula) {
      const cliente = await new Cliente({
        nombres,
        cedula,
        email,
        telefono,
        direccion,
      });
      await cliente.save();
      searchCedula = cliente;
    }

    const articulo = await new Articulo({
      equipo,
      marca,
      observaciones,
      serie,
      nodelo,
    });
    articulo.cliente = searchCedula._id;
    const detalle = await new Detalle();
    detalle.f_recepcion = new Date().toISOString();
    detalle.articulo = articulo._id;

    await articulo.save();
    await detalle.save();
    res.status(200).json({
      ok: true,
      articulo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const searchCedula = async (req, res) => {
  const { cedula } = req.body;
  const cliente = await Cliente.findOne({ cedula });
  if (cliente) {
    return res.status(201).json({
      ok: true,
      user: cliente,
    });
  } else {
    return res.status(404).json({
      ok: false,
      msg: "El usuario no esta registrado en la bd",
    });
  }
};

const editCliente = async (req, res = response) => {
  try {
    const { _id } = req.body;
    const idExist = await Cliente.findOne({ _id });

    if (!idExist) {
      return res.status(404).json({
        ok: false,
        user: "Id no existe en la bd",
      });
    }
    const cliente = await Cliente.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      cliente,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Internal Server",
    });
  }
};
module.exports = {
  newOrden,
  searchCedula,
  editCliente,
};
