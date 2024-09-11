const express = require("express");
const { optenerUsuarios, optenerMensajes, registro } = require("../controllers/conexionChat");
const router = express.Router();

router.get("/usuarios", optenerUsuarios);
router.get("/mensajes", optenerMensajes);
router.post("/registrar/:nombre/:id", registro)



module.exports = router;