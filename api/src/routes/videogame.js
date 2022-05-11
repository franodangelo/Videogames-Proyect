const {Router} = require('express');
const router = Router();
const axios = require('axios');
const {apiKey} = process.env;

const {Videogame, Genre} = require('../db');

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        let foundVideogame;

        if (id.length > 6) {
            response = await Videogame.findOne({
                where: {id: id},
                include: Genre
            });

            foundVideogame = {
                id: response.id,
                name: response.name,
                img: response.img,
                description: response.description,
                released: response.released,
                rating: response.rating,
                platforms: response.platforms,
                genres: response.genres.map(g => g.name)
            }

        } else {
            response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
            foundVideogame = {
                id: response.data.id,
                name: response.data.name,
                img: response.data.background_image,
                description: response.data.description,
                released: response.data.released,
                rating: response.data.rating,
                platforms: response.data.platforms.map(p => p.platform.name),
                genres: response.data.genres.map(g => g.name)
            };
        }
        res.send(foundVideogame);
    } catch (error) {
        console.log(error)
    }
});

router.post('/', async (req, res, next) => {
    const {img, name, released, genres, rating, description, platforms} = req.body;
    try {
        const newVideogame = await Videogame.create({
            img,
            name,
            released,
            genres,
            rating,
            description,
            platforms
        });

        genres?.forEach(async g => {
            var foundGenre = await Genre.findOne({
                where: {name: genres}
            });
            newVideogame.addGenre(foundGenre);
        });

        res.send(newVideogame);
    } catch (error) {
        console.log(error)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const videogame = req.body;
        await Videogame.update(videogame, {
            where: {
                id: id
            }
        });
        res.status(200).send(`The videogame with id ${id} was updated`);
    } catch (error) {
        next(error)
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        await Videogame.destroy({
            where: {
                id: id
            }
        });
        res.status(200).send(`The videogame with id ${id} was deleted`);
    } catch (error) {
        next(error)
    }
});

module.exports = router;