import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Paginated from "../components/Paginated";
import SearchBar from "../components/Searchbar";
import { Link } from 'react-router-dom';
import { getVideogames, filterByCreation, orderByName, orderByRating } from "../redux/actions";

export default function Home() {

    let allVideogames = useSelector((state) => state.videogames);

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);
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

    function handleFilterByCreation(e) {
        dispatch(filterByCreation(e.target.value))
    }

    // function handleFilterByGenre(e) {
    //     dispatch(filterByGenre(e.target.value))
    // }

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
        <div>
            <SearchBar/>
            <br />
            <Link to='/videogame'><button>Create videogame</button></Link>
            <div>
                <h1>Do you want to play a game?</h1>
                <h4>Filter by:</h4>
                <select onChange={e => handleFilterByCreation(e)}>
                    <option value='all'>All</option>
                    <option value='original'>Original</option>
                    <option value='created'>Created</option>
                </select>
                <select>
                    <option value='allGen'>All genres</option>
                </select>
                <h4>Order by:</h4>
                <select onChange={e => handleSortByName(e)}>
                    <option value='AZ'># - Z</option>
                    <option value='ZA'>Z - #</option>
                </select>
                <select onChange={e => handleSortByRating(e)}>
                    <option value='LTH'>Lower ratings</option>
                    <option value='HTL'>Higher ratings</option>
                </select>
                <br />
                <div>
                {allVideogames.length > 0
                    ? currentVideogames.map(vg => 
                    <Link key={vg.id} to={`/videogame/${vg.id}`}>
                        <Card name={vg.name} img={vg.img} genres={vg.genres} released={vg.released} rating={vg.rating}/>
                    </Link>) 
                    : <h1>Loading videogames...</h1>}
                </div>
                <Paginated videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} paginated={paginated}/>
            </div>
        </div>
    )
};