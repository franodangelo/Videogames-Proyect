import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Paginated from "../components/Paginated";
import SearchBar from "../components/Searchbar";
import InvalidSearch from "./InvalidSearch";
import NoGamesCreated from "./NoGamesCreated";
import Loader from "./Loader";
import { Link } from 'react-router-dom';
import { getVideogames, filterByCreation, filterByGenre, orderByName, orderByRating } from "../redux/actions";

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

    return (
        <main>
            <nav >
                <div>
                    <Link to='/home'><h1>Videogames SPA</h1></Link>
                </div>
                <div>
                    <Link to='/videogame'><button >Create videogame</button></Link>
                    <SearchBar />
                </div>
            </nav>
            <div>
                <div >
                    <button onClick={e => handleReset(e)}>Clear filters</button>
                    <div>
                        <h4>Filter by:</h4>
                        <select onChange={e => handleFilterByCreation(e)}>
                            <option value='all'>All videogames</option>
                            <option value='created'>Created by user</option>
                            <option value='original'>Original videogames</option>
                        </select>
                        <select onChange={e => handleFilterByGenre(e)}>
                            <option value="All">All genres</option>
                            <option value="Action">Action</option>
                            <option value="Adventure">Adventure</option>
                            <option value="Arcade">Arcade</option>
                            <option value="Board Games">Board Games</option>
                            <option value="Card">Card</option>
                            <option value="Casual">Casual</option>
                            <option value="Educational">Educational</option>
                            <option value="Family">Family</option>
                            <option value="Fighting">Fighting</option>
                            <option value="Indie">Indie</option>
                            <option value="Massively Multiplayer">Massively Multiplayer</option>
                            <option value="Platformer">Platformer</option>
                            <option value="Puzzle">Puzzle</option>
                            <option value="Racing">Racing</option>
                            <option value="RPG">RPG</option>
                            <option value="Shooter">Shooter</option>
                            <option value="Simulation">Simulation</option>
                            <option value="Sports">Sports</option>
                            <option value="Strategy">Strategy</option>
                        </select>
                    </div>
                    <div>
                        <h4>Order by:</h4>
                        <select onChange={e => handleSortByName(e)}>
                            <option value='AZ'># - Z</option>
                            <option value='ZA'>Z - #</option>
                        </select>
                        <select onChange={e => handleSortByRating(e)}>
                            <option value='LTH'>Lower ratings</option>
                            <option value='HTL'>Higher ratings</option>
                        </select>
                    </div>
                </div>
                <div >
                    {currentVideogames[0] === 'No games created' ? <NoGamesCreated />
                        : currentVideogames[0] === "No results" ? <InvalidSearch />
                            : currentVideogames.length === 0 ? <Loader />
                                : currentVideogames.map(vg =>
                                    <Link key={vg.id} to={`/videogame/${vg.id}`}>
                                        <Card name={vg.name} img={vg.img} genres={vg.genres} released={vg.released} rating={vg.rating} />
                                    </Link>)
                    }
                </div>
                <div >
                    <Paginated videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginated={paginated} />
                </div>
            </div>
            <div>
                <ul>
                    <li><a href="https://www.linkedin.com/in/franco-dangelo/">Linkedin</a></li>
                    <li><a href="https://github.com/franodangelo">GitHub</a></li>
                </ul>
                <h1>Created by Franco D'Angelo - 2022</h1>
            </div>
        </main>
    )
};