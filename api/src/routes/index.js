const { Router } = require('express');
// Importar todos los routers;

const genresRouter = require('./genres.js');
const videogameRouter = require('./videogame.js');
const videogamesRouter = require('./videogames.js');

const router = Router();

// Configurar los routers

router.use('/genres', genresRouter);
router.use('/videogame', videogameRouter);
router.use('/videogames', videogamesRouter);

module.exports = router;
