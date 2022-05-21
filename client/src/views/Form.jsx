import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, createVideogame, getVideogames } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import moduleStyles from '../Styles.module.css';

function validate(videogameLocalState) {
    let errors = {};
    if (!videogameLocalState.name) {
        errors.name = "You must provide a name"
    } else if(videogameLocalState.name.length < 3) {
        errors.name = "Check the length of your name. It doesn't have at least 3 characters"
    } else if(!videogameLocalState.description) {
        errors.description = "You must provide a description"
    } else if(videogameLocalState.description.length < 20) {
        errors.description = "Come on... give us some more words about your videogame!"
    } else if(!videogameLocalState.released) {
        errors.released = "You must provide a release date"
    } else if(!videogameLocalState.rating) {
        errors.rating = "You must provide a rate"
    }  else if(videogameLocalState.rating > 5 || videogameLocalState.rating < 0) {
        errors.rating = "Rate must be a number between 1-5"
    }
    return errors;
}

export default function Form() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [videogameLocalState, setVideogameLocalState] = useState({
        name: '',
        description: '',
        img: '',
        released: '',
        rating: '',
        platforms: [],
        genres: []
    })

    const [formErrors, setFormErrors] = useState({});

    const genres = useSelector(state => state.genres);

    // const plats = useSelector(state => state.videogames);
    // const mapPlats = plats.map(p => p.platforms);
    // const arrayPlats = [];
    // mapPlats?.map(p => p.map(a => {
    //     arrayPlats.push(a)
    // }));
    // const mySet = new Set(arrayPlats);
    // const setPlats = [...mySet];

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
        "Neo Geo",
    ];

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getVideogames())
    }
        , [dispatch]);

    function handleChange(e) {
        setVideogameLocalState({
            ...videogameLocalState,
            [e.target.name]: e.target.value
        })
        setFormErrors(validate({
            ...videogameLocalState,
            [e.target.name]: e.target.value
        }));
    }

    function handleChangePlatforms(e) {
        if(!videogameLocalState.platforms.includes(e.target.value)) { 
            setVideogameLocalState({
                ...videogameLocalState,
                platforms: [...videogameLocalState.platforms, e.target.value]
            })
        }
    }

    function handleChangeGenres(e) {
        if(!videogameLocalState.genres.includes(e.target.value)) {
            setVideogameLocalState({
                ...videogameLocalState,
                genres: [...videogameLocalState.genres, e.target.value]
            })
        }
    }

    function handleSubmit(e) {
        if(!videogameLocalState.name || !videogameLocalState.description || !videogameLocalState.img || !videogameLocalState.released || !videogameLocalState.rating || videogameLocalState.platforms.length < 1 || videogameLocalState.genres.length < 1) {
            e.preventDefault();
            alert('Some of the inputs are incomplete')
        }
        else {
            e.preventDefault();
            dispatch(createVideogame(videogameLocalState));
            alert('Videogame created succesfully!');
            setVideogameLocalState({
                name: '',
                description: '',
                img: '',
                released: '',
                rating: '',
                platforms: [],
                genres: []
            })
            navigate('/home');
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
        <div className={moduleStyles.formContainer}>
            <br />
            <h1>Create your own videogame</h1>
            <form className={moduleStyles.formContainer} onSubmit={(e) => handleSubmit(e)}>
                <div className={moduleStyles.formInput}>
                    <label htmlFor='name'>Name:</label>
                    <input name='name' type='text' className={moduleStyles.select} placeholder='3 characters at least' value={videogameLocalState.name} onChange={(e) => handleChange(e)}></input>
                    <br />
                    <div>{formErrors.name && (<p>{formErrors.name}</p>)}</div>
                </div>
                <div className={moduleStyles.formInput}>
                    <label htmlFor='description'>Description:</label>
                    <input name='description' type='text' className={moduleStyles.select} value={videogameLocalState.description} onChange={(e) => handleChange(e)}></input>
                    {formErrors.description && (<p>{formErrors.description}</p>)}
                </div>
                <div className={moduleStyles.formInput}>
                    <label htmlFor='released'>Date of release:</label>
                    <input name='released' type='date' className={moduleStyles.select} value={videogameLocalState.released} onChange={(e) => handleChange(e)}></input>
                    {formErrors.released && (<p>{formErrors.released}</p>)}
                </div>
                <div className={moduleStyles.formInput}>
                    <label htmlFor='rating'>Rating:</label>
                    <input name='rating' type='number' className={moduleStyles.select} placeholder='Rate between 1-5' value={videogameLocalState.rating} onChange={(e) => handleChange(e)}></input>
                    {formErrors.rating && (<p>{formErrors.rating}</p>)}
                </div>
                <div className={moduleStyles.formInput}>
                    <label htmlFor='img'>Image:</label>
                    <input name='img' type='url' className={moduleStyles.select} value={videogameLocalState.img} onChange={(e) => handleChange(e)}></input>
                </div>
                <div className={moduleStyles.formInput}>
                    <label htmlFor='platforms'>Platforms:</label>
                    <select name='platforms' className={moduleStyles.select} onChange={(e) => handleChangePlatforms(e)}>
                        <option hidden={true}>Select some platforms</option>
                        {platforms.map(pl => <option value={pl} className={moduleStyles.select}>{pl}</option>)}
                    </select>
                    <div>
                        {formErrors.platforms && (<p>{formErrors.platforms}</p>)}
                    </div>
                    <div>
                        {videogameLocalState.platforms.map(p =>
                            <div>
                                <button type='button' className={moduleStyles.chip} onClick={() => handleDeletePlatforms(p)}>{p}</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className={moduleStyles.formInput}>
                    <label htmlFor='genres'>Genres:</label>
                    <select name='genres' className={moduleStyles.select} onChange={(e) => handleChangeGenres(e)}>
                        <option hidden={true}>Select some genres</option>
                        {genres.map(g => <option value={g.name} className={moduleStyles.select}>{g.name}</option>)}
                    </select>
                    {videogameLocalState.genres.map(g =>
                        <div>
                            <button type='button' className={moduleStyles.chip} onClick={() => handleDeleteGenres(g)}>{g}</button>
                        </div>
                    )}
                </div>
                <br />
                <div className={moduleStyles.formButtons}>
                    <button type='submit' className={moduleStyles.button}>Create videogame</button>
                </div>
                <div className={moduleStyles.formButtons}>
                    <Link to='/home'><button className={moduleStyles.buttonSecondary}>Cancel</button></Link>
                </div>
            </form>
        </div>
    );
}