const { response } = require("express");
const Articulo = require("../models/articulo");
const Cliente = require("../models/cliente");
const Detalle = require("../models/detalle");

const getOrdenPendientes = async (req, res) => {
  try {
    const articulo = await Articulo.find({ estado: false }).populate("cliente");

    return res.status(200).json({
      ok: true,
      articulo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      msg: "Ocurrio un error",
    });
  }
};

const getOrden = async (req, res = response) => {
  const { cedula } = req.body;
  try {
    const cliente = await Cliente.findOne({ cedula });

    if (!cliente) {
      return res.status(404).json({
        ok: false,
        msg: "No se encontro el cliente con este numero de cedula",
      });
    }

    const articulo = await Articulo.find({ cliente: cliente._id });

    return res.status(200).json({
      ok: true,
      cliente,
      articulo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      msg: "Comuniquese con el administrador",
    });
  }
};

const resolveOrden = async (req, res = response) => {
  const { _id } = req.body;
  console.log({ _id });
  try {
    const idExist = await Articulo.findOne({ _id });
    if (!idExist) {
      return res.status(404).json({
        ok: false,
        msg: "Id no valido",
      });
    }
    const articulo = await Articulo.findByIdAndUpdate(
      _id,
      { estado: true },
      { new: true }
    );

    return res.status(200).json({
      ok: true,
      articulo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Comuniquese con el administrador",
    });
  }
};
const updateArticulo = async (req, res) => {
  try {
    const { id } = req.body;
    const idExist = await Articulo.findOne({ _id: id });

    if (!idExist) {
      return res.status(404).json({
        ok: false,
        user: "Id no existe en la bd",
      });
    }
    const articulo = await Articulo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      ok: true,
      articulo,
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
  getOrden,
  resolveOrden,
  updateArticulo,
  getOrdenPendientes,
};
