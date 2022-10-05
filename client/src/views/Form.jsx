import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createVideogame, getVideogames } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";

function validate(videogameLocalState) {
    let errors = {};
    if (!videogameLocalState.name) {
        errors.name = "You must provide a name"
    } else if (videogameLocalState.name.length < 3) {
        errors.name = "Check the length of your name. It does not have at least 3 characters"
    } else if (!videogameLocalState.description) {
        errors.description = "You must provide a description"
    } else if (videogameLocalState.description.length < 20) {
        errors.description = "Give us some more words about your videogame!"
    } else if (!videogameLocalState.released) {
        errors.released = "Enter a release date"
    } else if (!videogameLocalState.rating) {
        errors.rating = "Enter a rate"
    } else if (videogameLocalState.rating > 5 || videogameLocalState.rating < 0) {
        errors.rating = "Rate must be a number between 1-5"
    }
    return errors;
}

export default function Form() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [videogameLocalState, setVideogameLocalState] = useState({
        name: "",
        description: "",
        img: "",
        released: "",
        rating: "",
        platforms: [],
        genres: []
    })

    const [formErrors, setFormErrors] = useState({});
    const genres = useSelector(state => state.genres);

    let platforms = [
        "PC",
        "PlayStation 5",
        "Xbox One",
        "PlayStation 4",
        "Xbox Series S/X",
        "Nintendo Switch",
        "iOS",
        "Android",
        "Nintendo 3DS",
        "Nintendo DS",
        "Nintendo DSi",
        "macOS",
        "Linux",
        "Xbox 360",
        "Xbox",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "PS Vita",
        "PSP",
        "Wii U",
        "Wii",
        "GameCube",
        "Nintendo 64",
        "Game Boy Advance",
        "Game Boy Color",
        "Game Boy",
        "SNES",
        "NES",
        "Classic Macintosh",
        "Apple II",
        "Commodore / Amiga",
        "Atari 7800",
        "Atari 5200",
        "Atari 2600",
        "Atari Flashback",
        "Atari 8-bit",
        "Atari ST",
        "Atari Lynx",
        "Atari XEGS",
        "Genesis",
        "SEGA Saturn",
        "SEGA CD",
        "SEGA 32X",
        "SEGA Master System",
        "Dreamcast",
        "3DO",
        "Jaguar",
        "Game Gear",
        "Neo Geo"
    ]

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getVideogames())
    }
        , [dispatch])

    function handleChange(e) {
        setVideogameLocalState({
            ...videogameLocalState,
            [e.target.name]: e.target.value
        })
        setFormErrors(validate({
            ...videogameLocalState,
            [e.target.name]: e.target.value
        }))
    }

    function handleChangePlatforms(e) {
        if (!videogameLocalState.platforms.includes(e.target.value)) {
            setVideogameLocalState({
                ...videogameLocalState,
                platforms: [...videogameLocalState.platforms, e.target.value]
            })
        }
    }

    function handleChangeGenres(e) {
        if (!videogameLocalState.genres.includes(e.target.value)) {
            setVideogameLocalState({
                ...videogameLocalState,
                genres: [...videogameLocalState.genres, e.target.value]
            })
        }
    }

    function handleSubmit(e) {
        if (!videogameLocalState.name || !videogameLocalState.description || !videogameLocalState.img || !videogameLocalState.released || !videogameLocalState.rating || videogameLocalState.platforms.length < 1 || videogameLocalState.genres.length < 1) {
            e.preventDefault();
            alert("Some of the inputs are incomplete")
        }
        else {
            e.preventDefault();
            dispatch(createVideogame(videogameLocalState));
            alert("Videogame created successfully!");
            setVideogameLocalState({
                name: "",
                description: "",
                img: "",
                released: "",
                rating: "",
                platforms: [],
                genres: []
            })
            navigate("/");
        }
    }

    function handleDeletePlatforms(e) {
        setVideogameLocalState({
            ...videogameLocalState,
            platforms: videogameLocalState.platforms.filter(p => p !== e)
        })
    }

    function handleDeleteGenres(e) {
        setVideogameLocalState({
            ...videogameLocalState,
            genres: videogameLocalState.genres.filter(g => g !== e)
        })
    }

    return (
        <main className="flex flex-col w-full h-full items-center p-4 md:p-16 bg-shades-600">
            <h1 className="w-fit self-center font-bold text-2xl text-center">Create your own videogame</h1>
            <form className="flex flex-col h-auto w-full md:w-[65%] md:items-center p-8 gap-8" onSubmit={(e) => handleSubmit(e)}>
                <div className="flex flex-col md:flex-row w-full md:justify-between">
                    <section className="flex flex-col md:h-[400px]">
                        <div className="flex flex-col md:w-96 h-28 gap-2">
                            <label className="text-lg" htmlFor="name">Name</label>
                            <input className="p-2 rounded text-sm placeholder-palette-700 text-shades-600"
                                required
                                name="name"
                                type="text"
                                minlength="3"
                                placeholder="3 characters at least"
                                value={videogameLocalState.name}
                                onChange={(e) => handleChange(e)}>
                            </input>
                            <div>{formErrors.name && (<p className="font-bold text-xs text-palette-900">{formErrors.name}</p>)}</div>
                        </div>
                        <div className="flex flex-col md:w-96 h-40 gap-2">
                            <label className="text-lg" htmlFor="description">Description</label>
                            <input className="px-2 py-8 rounded text-sm placeholder-palette-700 text-shades-600"
                                required
                                name="description"
                                type="text"
                                minlength="20"
                                value={videogameLocalState.description}
                                onChange={(e) => handleChange(e)}>
                            </input>
                            {formErrors.description && (<p className="font-semibold text-sm text-palette-900">{formErrors.description}</p>)}
                        </div>
                        <div className="flex justify-between gap-4 md:gap-0">
                            <div className="flex flex-col w-full md:w-40 h-24 gap-2">
                                <label className="text-lg" htmlFor="released">Date of release</label>
                                <input className="p-2 rounded text-sm placeholder-palette-700 text-shades-600"
                                    required
                                    name="released"
                                    type="date"
                                    value={videogameLocalState.released}
                                    onChange={(e) => handleChange(e)}>
                                </input>
                                {formErrors.released && (<p className="font-semibold text-sm text-palette-900">{formErrors.released}</p>)}
                            </div>
                            <div className="flex flex-col w-full md:w-40 h-24 gap-2">
                                <label className="text-lg" htmlFor="rating">Rating</label>
                                <input className="p-2 rounded text-sm placeholder-palette-700 text-shades-600"
                                    required
                                    name="rating"
                                    type="number"
                                    min="0"
                                    max="5"
                                    placeholder="Rate between 1-5"
                                    value={videogameLocalState.rating}
                                    onChange={(e) => handleChange(e)}>
                                </input>
                                {formErrors.rating && (<p className="font-semibold text-sm text-palette-900">{formErrors.rating}</p>)}
                            </div>
                        </div>
                    </section>
                    <section className="flex flex-col md:h-[400px]">
                        <div className="flex flex-col md:w-96 h-28 gap-2">
                            <label className="text-lg" htmlFor="img">Image (URL)</label>
                            <input className="p-2 rounded text-sm placeholder-palette-700 text-shades-600"
                                required
                                name="img"
                                type="url"
                                value={videogameLocalState.img}
                                onChange={(e) => handleChange(e)}>
                            </input>
                        </div>
                        <div className="flex flex-col md:w-96 h-40 gap-2">
                            <label className="text-lg" htmlFor="platforms">Platforms</label>
                            <select className="p-2 rounded text-sm placeholder-palette-700 text-shades-600"
                                required
                                name="platforms"
                                onChange={(e) => handleChangePlatforms(e)}>
                                <option hidden={true}>Select some platforms</option>
                                {platforms.map(pl => <option className="text-shades-600" value={pl} >{pl}</option>)}
                            </select>
                            {formErrors.platforms && (<p>{formErrors.platforms}</p>)}
                            <div className="flex flex-wrap gap-2">
                                {videogameLocalState.platforms.map(p =>
                                    <p className="px-2 text-sm bg-palette-200 rounded" type="button" onClick={() => handleDeletePlatforms(p)}>{p}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:w-96 h-40 gap-2">
                            <label className="text-lg" htmlFor="genres">Genres</label>
                            <select className="p-2 rounded text-sm placeholder-palette-700 text-shades-600"
                                required
                                name="genres"
                                onChange={(e) => handleChangeGenres(e)}>
                                <option hidden={true}>Select some genres</option>
                                {genres.map(g => <option className="text-shades-600" value={g.name}>{g.name}</option>)}
                            </select>
                            <div className="flex flex-wrap gap-2">
                                {videogameLocalState.genres.map(g =>
                                    <p className="px-2 text-sm bg-palette-200 rounded" type="button" onClick={() => handleDeleteGenres(g)}>{g}</p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
                <div className="flex w-full justify-center md:justify-end gap-2">
                    <Link to="/"><button>Cancel</button></Link>
                    <button>Create videogame</button>
                </div>
            </form>
        </main>
    )
}