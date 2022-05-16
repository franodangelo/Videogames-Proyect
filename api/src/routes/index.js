const { Router } = require('express');

const genresRouter = require('./genres.js');
const videogameRouter = require('./videogame.js');
const videogamesRouter = require('./videogames.js');

const router = Router();

router.use('/genres', genresRouter);
router.use('/videogame', videogameRouter);
router.use('/videogames', videogamesRouter);

module.exports = router;
