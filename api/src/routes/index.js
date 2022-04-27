const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const dogRoutes = require("./dogs");
const temperamentRoutes = require("./temperaments")

const router = Router();

router.use("/", dogRoutes);
router.use("/", temperamentRoutes);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
