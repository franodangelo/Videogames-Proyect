import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, createVideogame, getVideogames } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';

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
        dispatch(getGenres()) // obtengo generos y luego puedo buscarlos y seleccionarlos en mi select
        dispatch(getVideogames()) // obtengo juegos, desp mapeo por plataformas para poder buscarlas y seleccionarlas en mi select
    }
        , [dispatch]);

    function handleChange(e) { // manejo cambios en inputs segun lo que se vaya escribiendo
        setVideogameLocalState({
            ...videogameLocalState,
            [e.target.name]: e.target.value
        })
        setFormErrors(validate({ // seteo el estado de error usando la funcion validate para ver su cumplimiento
            ...videogameLocalState,
            [e.target.name]: e.target.value
        }));
    }

    function handleChangePlatforms(e) { // manejo cambios en el select de platforms segun lo que se vaya eligiendo
        setVideogameLocalState({
            ...videogameLocalState,
            platforms: [...videogameLocalState.platforms, e.target.value] // guardo lo que tenia el estado mas la nueva plat a agregar
        })
    }

    function handleChangeGenres(e) { // manejo cambios en el select de genres segun lo que se vaya eligiendo
        setVideogameLocalState({
            ...videogameLocalState,
            genres: [...videogameLocalState.genres, e.target.value] // guardo lo que tenia el estado mas el nuevo genero a agregar
        })
    }

    function handleSubmit(e) { // controlo la creacion de un videojuego
        e.preventDefault();
        dispatch(createVideogame(videogameLocalState)); // creo el videojuego con la info almacenada en el estado
        alert('Videogame created succesfully!'); // envio un mensaje al usuario al crear el videojuego
        setVideogameLocalState({ // una vez creado, seteo el estado vacio nuevamente
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

    function handleDeletePlatforms(e) { // manejo eliminaciones en el select de platforms
        setVideogameLocalState({
            ...videogameLocalState,
            platforms: videogameLocalState.platforms.filter(p => p !== e)
        })
    }

    function handleDeleteGenres(e) { // manejo eliminaciones en el select de genres
        setVideogameLocalState({
            ...videogameLocalState,
            genres: videogameLocalState.genres.filter(g => g !== e)
        })
    }

    return (
        <div>
            <h1>Create your own videogame</h1>
            <form onSubmit={(e) => handleSubmit(e)}> 
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input required type='text' name='name' placeholder='3 characters at least' value={videogameLocalState.name} onChange={(e) => handleChange(e)}></input>
                    {formErrors.name && (<p>{formErrors.name}</p>)}
                </div>

                <br />

                <div>
                    <label htmlFor='description'>Description:</label>
                    <input required type='text' name='description' value={videogameLocalState.description} onChange={(e) => handleChange(e)}></input>
                    {formErrors.description && (<p>{formErrors.description}</p>)}
                </div>

                <br />

                <div>
                    <label htmlFor='released'>Date of release:</label>
                    <input type='date' name='released' value={videogameLocalState.released} onChange={(e) => handleChange(e)}></input>
                    {formErrors.released && (<p>{formErrors.released}</p>)}
                </div>

                <br />
                
                <div>
                    <label htmlFor='rating'>Rating:</label>
                    <input type='number' name='rating' placeholder='A number between 1 and 5' value={videogameLocalState.rating} onChange={(e) => handleChange(e)}></input>
                    {formErrors.rating && (<p>{formErrors.rating}</p>)}
                </div>

                <br />

                <div>
                    <label htmlFor='img'>Image:</label>
                    <input type='url' name='img' value={videogameLocalState.img} onChange={(e) => handleChange(e)}></input>
                </div>

                <br />

                <div></div>
                <label htmlFor='platforms'>Platforms:</label>
                <select name='platforms' onChange={(e) => handleChangePlatforms(e)}>
                    <option hidden={true}>Select some platforms</option>
                    {platforms.map(pl => <option value={pl}>{pl}</option>)}
                </select>
                {formErrors.platforms && (<p>{formErrors.platforms}</p>)}
                {videogameLocalState.platforms.map(p => 
                    <div>
                        <button onClick={() => handleDeletePlatforms(p)}>{p}</button>
                    </div>
                )}
                <br />

                <label htmlFor='genres'>Genres:</label>
                <select name='genres' onChange={(e) => handleChangeGenres(e)}>
                    <option hidden={true}>Select some genres</option>
                    {genres.map(g => <option value={g.name}>{g.name}</option>)}
                </select>
                {videogameLocalState.genres.map(g => 
                    <div>
                        <button onClick={() => handleDeleteGenres(g)}>{g}</button>
                    </div>
                )}
                <br />
                <button type='submit'>Create</button>
                <Link to='/home'><button>Cancel</button></Link>
            </form>
        </div>
    );
}