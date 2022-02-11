const { Router } = require("express");
const { check } = require("express-validator");
const { authAdmin, login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");

const router = Router();

router.post("/", authAdmin);

router.post(
  "/login",
  [
    check("username", "El nombre de usuario es requerido").not().isEmpty(),
    check("password", "La contraseña es requerida").not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
