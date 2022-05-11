const {Router} = require('express');
const router = Router();
const {Op} = require('sequelize');
const axios = require('axios');
const {apiKey} = process.env;
const {Videogame, Genre} = require('../db');

let videogames = [];

router.get("/", async (req, res, next) => {
    try {
        const {name} = req.query;
        if (name) {
            let gamesDb = [];
            const nameDb = await Videogame.findAll({
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    }
                },
                include: Genre,
                limit: 15,
            });
            if (nameDb.length > 0) {
                gamesDb = nameDb.map((vg) => {
                    return {
                        id: vg.id,
                        name: vg.name,
                        img: vg.img,
                        released: vg.released,
                        rating: vg.rating,
                        genres: vg.genres
                    };
                });
            }
            const nameApi = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${apiKey}`)).data.results;
            let gamesApi = [];
            if (nameApi.length > 0) {
                gamesApi = nameApi.map((vg) => {
                    return {
                        id: vg.id,
                        name: vg.name,
                        img: vg.background_image,
                        released: vg.released,
                        rating: vg.rating,
                        platforms: vg.platforms?.map((p) => p.platform.name),
                        genres: vg.genres?.map((g) => g.name)
                    };
                });
            }
            let videogames = [...gamesDb, ...gamesApi];
            videogames = videogames.slice(0, 15);
            videogames.length === 0 ?
                res.send(["No existe el juego"]) :
                res.send(videogames);
        } else {
            let videogames = [];
            const videogamesDb = await Videogame.findAll({
                include: Genre,
                limit: 100,
            });
            videogamesDb.forEach((vg) => {
                videogames.push({
                    id: vg.id,
                    name: vg.name,
                    img: vg.img,
                    released: vg.released,
                    rating: vg.rating,
                    genres: vg.genres.map((g) => g.name)
                });
            });

            const api = axios.get(`https://api.rawg.io/api/games?key=${apiKey}`);
            const api2 = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=2`);
            const api3 = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=3`);
            const api4 = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=4`);
            const api5 = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=5`);
            let promesas = await Promise.all([api, api2, api3, api4, api5]);
            pageOne = promesas[0].data.results;
            pageTwo = promesas[1].data.results;
            pageThree = promesas[2].data.results;
            pageFour = promesas[3].data.results;
            pageFive = promesas[4].data.results;
            let allPages = pageOne.concat(pageTwo, pageThree, pageFour, pageFive)
            allPages.forEach((vg) => {
                videogames.push({
                    id: vg.id,
                    name: vg.name,
                    img: vg.background_image,
                    released: vg.released,
                    rating: vg.rating,
                    platforms: vg.platforms.map((p) => p.platform.name),
                    genres: vg.genres.map((g) => g.name),
                });
            });
            res.send(videogames);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;