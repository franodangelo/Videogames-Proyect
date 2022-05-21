import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Paginated from "../components/Paginated";
import SearchBar from "../components/Searchbar";
import InvalidSearch from "./InvalidSearch";
import NoGamesCreated from "./NoGamesCreated";
import Loader from "./Loader";
import { Link } from 'react-router-dom';
import { getVideogames, filterByCreation, filterByGenre, orderByName, orderByRating } from "../redux/actions";
import moduleStyles from '../Styles.module.css';

export default function Home() {

    let allVideogames = useSelector((state) => state.videogames);

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setvideogamesPerPage] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage; 
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);
    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const dispatch = useDispatch();
    
    useEffect(() => {
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
                    <Link to='/home'><h1>Videogames SPA</h1></Link>
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
                        <option className={moduleStyles.select} value='all'>All videogames</option>
                        <option className={moduleStyles.select} value='created'>Created by user</option>
                        <option className={moduleStyles.select} value='original'>Original videogames</option>
                    </select>
                    <select className={moduleStyles.select} onChange={e => handleFilterByGenre(e)}>
                        <option className={moduleStyles.select} value="All">All genres</option>
                        <option className={moduleStyles.select} value="Action">Action</option>
                        <option className={moduleStyles.select} value="Adventure">Adventure</option>
                        <option className={moduleStyles.select} value="Arcade">Arcade</option>
                        <option className={moduleStyles.select} value="Board Games">Board Games</option>
                        <option className={moduleStyles.select} value="Card">Card</option>
                        <option className={moduleStyles.select} value="Casual">Casual</option>
                        <option className={moduleStyles.select} value="Educational">Educational</option>
                        <option className={moduleStyles.select} value="Family">Family</option>
                        <option className={moduleStyles.select} value="Fighting">Fighting</option>
                        <option className={moduleStyles.select} value="Indie">Indie</option>
                        <option className={moduleStyles.select} value="Massively Multiplayer">Massively Multiplayer</option>
                        <option className={moduleStyles.select} value="Platformer">Platformer</option>
                        <option className={moduleStyles.select} value="Puzzle">Puzzle</option>
                        <option className={moduleStyles.select} value="Racing">Racing</option>
                        <option className={moduleStyles.select} value="RPG">RPG</option>
                        <option className={moduleStyles.select} value="Shooter">Shooter</option>
                        <option className={moduleStyles.select} value="Simulation">Simulation</option>
                        <option className={moduleStyles.select} value="Sports">Sports</option>
                        <option className={moduleStyles.select} value="Strategy">Strategy</option>
                    </select>
                    </div>
                    <div>
                        <h4>Order by:</h4>
                        <select className={moduleStyles.select} onChange={e => handleSortByName(e)}>
                            <option className={moduleStyles.select} value='AZ'># - Z</option>
                            <option className={moduleStyles.select} value='ZA'>Z - #</option>
                        </select>
                        <select className={moduleStyles.select} onChange={e => handleSortByRating(e)}>
                            <option className={moduleStyles.select} value='LTH'>Lower ratings</option>
                            <option className={moduleStyles.select} value='HTL'>Higher ratings</option>
                        </select>
                    </div>
                </div>
                {/* Grilla con cards */}
                <div className={moduleStyles.cards}>
                    { currentVideogames[0] === 'No games created' ? <NoGamesCreated/>
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