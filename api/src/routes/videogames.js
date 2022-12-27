const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");
const axios = require("axios");
const { apiKey } = process.env;
const { Videogame, Genre } = require("../db");

router.get("/", async (req, res, next) => {
    try {
        const { name } = req.query;
        if (name) {
            let gamesDb = [];
            const nameDb = await Videogame.findAll({
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%"
                    }
                },
                include: Genre
            });
            if (nameDb.length > 0) {
                gamesDb = nameDb.map(game => {
                    return {
                        id: game.id,
                        name: game.name,
                        img: game.img,
                        released: game.released,
                        rating: game.rating,
                        genres: game.genres,
                        ratings: game.ratings,
                        metacritic: game.metacritic,
                        playtime: game.playtime,
                        tags: game.tags,
                        esrbRating: game.esrbRating,
                        shortScreenshots: game.shortScreenshots
                    }
                })
            }
            const nameAPI = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${apiKey}`)).data.results;
            let gamesApi = [];
            if (nameAPI.length > 0) {
                gamesApi = nameAPI.map((game) => {
                    return {
                        id: game.id,
                        name: game.name,
                        img: game.background_image,
                        released: game.released,
                        rating: game.rating,
                        platforms: game.platforms?.map((p) => p.platform.name),
                        genres: game.genres?.map((g) => g.name),
                        ratings: game.ratings.map(r => r.title),
                        metacritic: game.metacritic,
                        playtime: game.playtime,
                        tags: game.tags.map(t => t.name),
                        esrbating: game.esrb_rating,
                        shortScreenshots: game.short_screenshots.map(s => s.image)
                    }
                })
            }
            let videogames = [...gamesDb, ...gamesApi];
            videogames = videogames.slice(0, 15);
            videogames.length === 0 ? res.send(["No results"]) : res.send(videogames);
        } else {
            let videogames = [];
            const videogamesDb = await Videogame.findAll({
                include: Genre
            })
            videogamesDb.forEach(game => {
                videogames.push({
                    id: game.id,
                    name: game.name,
                    img: game.img,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms?.map((p) => p.platform.name),
                    genres: game.genres.map((g) => g.name),
                    ratings: game.ratings.map(r => r.title),
                    metacritic: game.metacritic,
                    playtime: game.playtime,
                    tags: game.tags.map(t => t.name),
                    esrbating: game.esrb_rating,
                    shortScreenshots: game.short_screenshots.map(s => s.image)
                })
            })
            const firstPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page_size=40`);
            const secondPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=2&page_size=40`);
            const thirdPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=3&page_size=40`);
            const fourthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=4&page_size=40`);
            const fifthPagePetition = axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=5&page_size=40`);
            let allPetitions = await Promise.all([firstPagePetition, secondPagePetition, thirdPagePetition, fourthPagePetition, fifthPagePetition]);
            pageOne = allPetitions[0].data.results;
            pageTwo = allPetitions[1].data.results;
            pageThree = allPetitions[2].data.results;
            pageFour = allPetitions[3].data.results;
            pageFive = allPetitions[4].data.results;
            let allPages = pageOne.concat(pageTwo, pageThree, pageFour, pageFive)
            allPages.forEach((game) => {
                videogames.push({
                    id: game.id,
                    name: game.name,
                    img: game.background_image,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms.map(p => p.platform.name),
                    genres: game.genres.map(g => g.name),
                    ratings: game.ratings.map(r => r.title),
                    metacritic: game.metacritic,
                    playtime: game.playtime,
                    tags: game.tags.map(t => t.name),
                    esrbating: game.esrb_rating,
                    shortScreenshots: game.short_screenshots.map(s => s.image)
                })
            })
            res.send(videogames);
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;