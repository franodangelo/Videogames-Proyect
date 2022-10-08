const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { apiKey } = process.env;
const { Videogame, Genre } = require('../db');
const { response } = require('../app');

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let foundVideogame;
        if (id.length > 6) {
            response = await Videogame.findOne({
                where: {
                    id: id
                },
                include: Genre
            })
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
            gameAPIData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
            foundVideogame = {
                id: gameAPIData.data.id,
                name: gameAPIData.data.name,
                img: gameAPIData.data.background_image,
                description: gameAPIData.data.description_raw,
                tags: gameAPIData.data.tags.map(t => t.name),
                released: gameAPIData.data.released,
                platforms: gameAPIData.data.platforms.map(p => p.platform.name),
                genres: gameAPIData.data.genres.map(g => g.name),
                rating: gameAPIData.data.rating,
                esrbRating: gameAPIData.data.esrb_rating.name,
                metacritic: gameAPIData.data.metacritic,
                metacriticURL: gameAPIData.data.metacritic_url,
                developedBy: gameAPIData.data.developers.map(d => d.name),
                website: gameAPIData.data.website
            }
        }
        res.send(foundVideogame);
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const { img, name, released, genres, rating, description, platforms } = req.body;
    try {
        const newVideogame = await Videogame.create({
            img,
            name,
            released,
            genres,
            rating,
            description,
            platforms
        })
        genres?.forEach(async g => {
            var foundGenre = await Genre.findOne({
                where: { name: genres }
            })
            newVideogame.addGenre(foundGenre);
        })
        res.send(newVideogame);
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Videogame.destroy({
            where: {
                id: id
            }
        })
        res.status(200).send(`The videogame with id ${id} was deleted`);
    } catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const videogame = req.body;
        await Videogame.update(videogame, {
            where: {
                id: id
            }
        })
        res.status(200).send(`The videogame with id ${id} was updated`);
    } catch (error) {
        next(error);
    }
})

module.exports = router;