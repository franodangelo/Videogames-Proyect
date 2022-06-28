const { Router } = require('express');
const router = Router();
const axios = require('axios');

const { Genre } = require('../db');

router.get("/", async (req, res, next) => {
    try {
        const genreApi = await axios.get(`https://api.rawg.io/api/genres?key=8475c9da71bf4c8f8c10ccf4df4cbe7e`);
        genreApi.data.results.forEach(async (genre) => {
            await Genre.findOrCreate({
                where: {
                    name: genre.name
                }
            });
        });
        const genreDb = await Genre.findAll();
        res.send(genreDb);
    } catch (error) {
        next(error);
    }
});

module.exports = router;