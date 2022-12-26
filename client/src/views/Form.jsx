import { useState, useEffect } from "react";
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
    }, [dispatch])

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
            alert("Some of the inputs are incomplete");
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
            platforms: videogameLocalState.platforms.filter(platform => platform !== e)
        })
    }

    function handleDeleteGenres(e) {
        setVideogameLocalState({
            ...videogameLocalState,
            genres: videogameLocalState.genres.filter(genre => genre !== e)
        })
    }

    return (
        <main className="flex flex-col w-full h-full items-center px-4 py-8 lg:px-16 lg:py-12 gap-4 text-white bg-slate-900">
            <h1 className="w-fit self-center font-bold text-2xl lg:text-3xl text-center">Create your own game</h1>
            <form className="flex flex-col h-auto w-full m-auto lg:w-auto lg:items-center p-4 md:p-8 gap-4 lg:gap-8 rounded-lg bg-slate-800"
                onSubmit={e => handleSubmit(e)}>
                <div className="flex flex-col lg:flex-row w-full lg:gap-8">
                    <section className="flex flex-col lg:h-[400px] gap-4">
                        <div className="flex flex-col lg:w-96 h-32">
                            <label className="text-lg" htmlFor="name">Name</label>
                            <input required className="select w-full mt-2 p-2 text-sm"
                                name="name" type="text" minlength="3" placeholder="Min. 3 characters"
                                value={videogameLocalState.name}
                                onChange={(e) => handleChange(e)}>
                            </input>
                            <div>
                                {formErrors.name && (<p className="mt-2 font-bold text-xs text-rose-700">{formErrors.name}</p>)}
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-96 h-40">
                            <label className="text-lg" htmlFor="description">Description</label>
                            <input required className="select w-full mt-2 px-2 py-8 text-sm"
                                name="description" type="text" minlength="20" placeholder="Min. 20 characters"
                                value={videogameLocalState.description}
                                onChange={e => handleChange(e)}>
                            </input>
                            {formErrors.description && (<p className="mt-2 font-semibold text-sm text-rose-700">{formErrors.description}</p>)}
                        </div>
                        <div className="flex justify-between gap-4 lg:gap-0">
                            <div className="flex flex-col w-full lg:w-40 h-32 gap-2">
                                <label className="text-lg" htmlFor="released">Date of release</label>
                                <input required className="select w-full p-2 text-sm"
                                    name="released" type="date"
                                    value={videogameLocalState.released}
                                    onChange={e => handleChange(e)}>
                                </input>
                                {formErrors.released && (<p className="font-semibold text-sm text-rose-700">{formErrors.released}</p>)}
                            </div>
                            <div className="flex flex-col w-full lg:w-40 h-32 gap-2">
                                <label className="text-lg" htmlFor="rating">Rating</label>
                                <input required className="select w-full p-2 text-sm"
                                    name="rating" type="number" min="0" max="5" placeholder="Rate between 1-5"
                                    value={videogameLocalState.rating}
                                    onChange={e => handleChange(e)}>
                                </input>
                                {formErrors.rating && (<p className="font-semibold text-sm text-rose-700">{formErrors.rating}</p>)}
                            </div>
                        </div>
                    </section>
                    <section className="flex flex-col lg:h-[400px] gap-4">
                        <div className="flex flex-col lg:w-96 h-32 gap-2">
                            <label className="text-lg" htmlFor="img">Image (URL)</label>
                            <input required className="select w-full p-2 text-sm"
                                name="img" type="url"
                                value={videogameLocalState.img}
                                onChange={(e) => handleChange(e)}>
                            </input>
                        </div>
                        <div className="flex flex-col lg:w-96 h-32 lg:h-40">
                            <label className="text-lg" htmlFor="platforms">Platforms</label>
                            <select required className="select w-full mt-2 p-2 text-sm"
                                name="platforms"
                                onChange={e => handleChangePlatforms(e)}>
                                <option hidden={true}>Select some platforms</option>
                                {platforms.map(platform => <option value={platform}>{platform}</option>)}
                            </select>
                            {formErrors.platforms && (<p>{formErrors.platforms}</p>)}
                            <div className="flex flex-wrap gap-2">
                                {videogameLocalState.platforms.map(platform =>
                                    <p className="mt-2 px-2 py-1 text-xs uppercase text-slate-800 bg-slate-200"
                                        type="button"
                                        onClick={() => handleDeletePlatforms(platform)}>{platform}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col lg:w-96 h-32 lg:h-40">
                            <label className="text-lg" htmlFor="genres">Genres</label>
                            <select required className="select w-full mt-2 p-2 text-sm"
                                name="genres"
                                onChange={e => handleChangeGenres(e)}>
                                <option hidden={true}>Select some genres</option>
                                {genres.map(genre => <option value={genre.name}>{genre.name}</option>)}
                            </select>
                            <div className="flex flex-wrap gap-2">
                                {videogameLocalState.genres.map(genre =>
                                    <p className="mt-2 px-2 py-1 text-xs uppercase text-slate-800 bg-slate-200"
                                        type="button"
                                        onClick={() => handleDeleteGenres(genre)}>
                                        {genre}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
                <div className="flex w-full justify-center lg:justify-end gap-2">
                    <Link to="/"><button className="secondaryButton">Cancel</button></Link>
                    <button className="primaryButton" onClick={e => handleSubmit(e)}>Confirm game</button>
                </div>
            </form>
        </main>
    )
}