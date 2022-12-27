const { Router } = require("express");
const router = Router();

const genresRouter = require("./genres.js");
const videogameRouter = require("./videogame.js");
const videogamesRouter = require("./videogames.js");

router.use("/genres", genresRouter);
router.use("/videogame", videogameRouter);
router.use("/videogames", videogamesRouter);

module.exports = router;
