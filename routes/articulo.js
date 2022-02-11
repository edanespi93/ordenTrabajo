const { Router } = require("express");
const { check } = require("express-validator");
const {
  getOrden,
  resolveOrden,
  updateArticulo,
  getOrdenPendientes,
} = require("../controllers/articulo");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

router.get("/pendientes", getOrdenPendientes);

router.post(
  "/searchOrden",
  [
    check("cedula", "La cedula del cliente es requrido").not().isEmpty(),
    validarCampos,
  ],
  getOrden
);

router.put(
  "/search",
  [check("id", "No es un id valido").not().isMongoId(), validarCampos],
  resolveOrden
);

router.put(
  "/edit",
  [
    check("equipo", "El nombre del equipo es requerido").not().isEmpty(),
    check("marca", "La marca del equipo es requerido").not().isEmpty(),
    check("observaciones", "Las observaciones del equipo son requeridas")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  updateArticulo
);

module.exports = router;
