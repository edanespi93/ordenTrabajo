const { Router } = require("express");
const { check } = require("express-validator");
const { newOrden, searchCedula, editCliente } = require("../controllers/user");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();
router.post(
  "/",
  [
    check("nombres", "Los nombres del cliente son requridos").not().isEmpty(),
    check("cedula", "La cedula del cliente es requrido").not().isEmpty(),
    check("email", "El Email del cliente es requrido").not().isEmpty(),
    check("email", "No es Email valido").isEmail(),
    check("telefono", "El telefono es requerido").not().isEmpty(),
    check("equipo", "El nombre del equipo es requerido").not().isEmpty(),
    check("marca", "La marca del equipo es requerido").not().isEmpty(),
    check("observaciones", "Las observaciones del equipo son requeridas")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  newOrden
);

router.put(
  "/edit/",
  [
    check("nombres", "Los nombres del cliente son requridos").not().isEmpty(),
    check("cedula", "La cedula del cliente es requrido").not().isEmpty(),
    check("email", "El Email del cliente es requrido").not().isEmpty(),
    check("email", "No es Email valido").isEmail(),
    check("telefono", "El telefono es requerido").not().isEmpty(),
    validarCampos,
  ],
  editCliente
);

router.post(
  "/searchCedula",
  [
    check("cedula", "La cedula del cliente es requerido").not().isEmpty(),
    validarCampos,
  ],
  searchCedula
);

module.exports = router;
