import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"; // Hooks
import Card from "../components/Card";
import Paginated from "../components/Paginated";
import SearchBar from "../components/Searchbar";
import InvalidSearch from "./InvalidSearch";
import Loader from "./Loader";
import { Link } from 'react-router-dom';
import { getVideogames, filterByCreation, filterByGenre, orderByName, orderByRating } from "../redux/actions";

import moduleStyles from '../Styles.module.css';

export default function Home() {

    let allVideogames = useSelector((state) => state.videogames); // Traigo lo que existe en el estado videogames

    const [currentPage, setCurrentPage] = useState(1); // seteamos en 1 porque voy a arrancar en la primer página
    const [videogamesPerPage, setvideogamesPerPage] = useState(15); // guardo cuantos personajes quiero por página
    const indexOfLastVideogame = currentPage * videogamesPerPage; 
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame); // contiene los juegos que están en la página actual
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const dispatch = useDispatch(); // Guardo en una constante el Hook para despachar acciones
    
    useEffect(() => { // Cuando el componente se monta, traemos los videojuegos del estado
        dispatch(getVideogames());
    }, [dispatch])

    function handleReset(e) {
        e.preventDefault();
        dispatch(getVideogames())
    }

    function handleFilterByCreation(e) {
        e.preventDefault();
        dispatch(filterByCreation(e.target.value))
        setCurrentPage(1);
    }

    function handleFilterByGenre(e) {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1);
    }

    const [order, setOrder] = useState('');

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`)
    }

    function handleSortByRating(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`)
    }

    return(
        <main className={moduleStyles.main}>
            {/* Navbar */}
            <div className={moduleStyles.nav}>
                <div className={moduleStyles.navleft}>
                    <h1>Do you want to play a game?</h1>
                </div>
                <div className={moduleStyles.navRight}>
                <Link to='/videogame'><button className={moduleStyles.button}>Create videogame</button></Link>
                <SearchBar/>
                </div>
            </div>
            {/* Contenido */}
            <div>
                {/* Barra de filtros y ordenamiento */}
                <div className={moduleStyles.filtersAndOrders}>
                    <button className={moduleStyles.buttonSecondary} onClick={e => handleReset(e)}>Clear filters</button>
                    <div>
                    <h4>Filter by:</h4>
                    <select className={moduleStyles.select} onChange={e => handleFilterByCreation(e)}>
                        <option value='all'>All videogames</option>
                        <option value='original'>Original videogames</option>
                        <option value='created'>Created by user</option>
                    </select>
                    <select className={moduleStyles.select} onChange={e => handleFilterByGenre(e)}>
                        <option value="All">All genres</option>
                        <option value="Action">Action</option>
                        <option value="Indie">Indie</option>
                        <option value="Adventure">Adventure</option>
                        <option value="RPG">RPG</option>
                        <option value="Strategy">Strategy</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Casual">Casual</option>
                        <option value="Simulation">Simulation</option>
                        <option value="Puzzle">Puzzle</option>
                        <option value="Arcade">Arcade</option>
                        <option value="Platformer">Platformer</option>
                        <option value="Racing">Racing</option>
                        <option value="Massively Multiplayer">Massively Multiplayer</option>
                        <option value="Sports">Sports</option>
                        <option value="Fighting">Fighting</option>
                        <option value="Family">Family</option>
                        <option value="Board Games">Board Games</option>
                        <option value="Educational">Educational</option>
                        <option value="Card">Card</option>
                    </select>
                    </div>
                    <div>
                        <h4>Order by:</h4>
                        <select className={moduleStyles.select} onChange={e => handleSortByName(e)}>
                            <option value='AZ'># - Z</option>
                            <option value='ZA'>Z - #</option>
                        </select>
                        <select className={moduleStyles.select} onChange={e => handleSortByRating(e)}>
                            <option value='LTH'>Lower ratings</option>
                            <option value='HTL'>Higher ratings</option>
                        </select>
                    </div>
                </div>
                {/* Grilla con cards */}
                <div className={moduleStyles.cards}>
                    { currentVideogames[0] === 'No games created' ? <h2>No games created yet</h2>
                    : currentVideogames[0] === "No results" ? <InvalidSearch/>
                    : currentVideogames.length === 0 ? <Loader/>
                    : currentVideogames.map(vg => 
                        <Link key={vg.id} to={`/videogame/${vg.id}`}>
                            <Card name={vg.name} img={vg.img} genres={vg.genres} released={vg.released} rating={vg.rating}/>
                        </Link>)
                    }
                </div>
                {/* Paginado */}
                <div className={moduleStyles.paginatedBox}>
                    <Paginated videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginated={paginated}/>
                </div>    
            </div>
            {/* Footer */}
            <div className={moduleStyles.footer}>
                <ul>
                    <li><a href="https://www.linkedin.com/in/franco-dangelo/">Linkedin</a></li>
                    <li><a href="https://github.com/franodangelo">GitHub</a></li>
                </ul>
                <h1>Created by Franco D'Angelo - 2022</h1>
            </div>
        </main>
    )
};