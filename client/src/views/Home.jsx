import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, filterByCreation, filterByGenre, orderByName, orderByRating } from "../redux/actions";
import InvalidSearch from "./InvalidSearch";
import NoGamesCreated from "./NoGamesCreated";
import Card from "../components/Card";
import Paginated from "../components/Paginated";
import Loader from "./Loader";

export default function Home() {

    let allVideogames = useSelector((state) => state.videogames);

    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(40);
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
        dispatch(getVideogames());
    }

    function handleFilterByCreation(e) {
        e.preventDefault();
        dispatch(filterByCreation(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterByGenre(e) {
        e.preventDefault();
        dispatch(filterByGenre(e.target.value));
        setCurrentPage(1);
    }

    const setOrder = useState("");

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }

    function handleSortByRating(e) {
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }

    return (
        <main className="flex flex-col min-h-screen w-full items-center text-white bg-slate-900">
            <div className="flex flex-col w-full items-center">
                <div className="flex flex-col-reverse md:flex-row flex-wrap md:flex-nowrap w-full p-8 justify-center items-center gap-4 md:justify-end">
                    <button className="h-auto secondaryButton"
                        onClick={e => handleReset(e)}>Clear filters
                    </button>
                    <div className="flex justify-center gap-4">
                        <select className="select" onChange={e => handleFilterByCreation(e)}>
                            <option value="all">All videogames</option>
                            <option value="created">Created by user</option>
                            <option value="original">Original videogames</option>
                        </select>
                        <select className="select" onChange={e => handleFilterByGenre(e)}>
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
                    <div className="flex justify-center gap-4">
                        <select className="select" onChange={e => handleSortByName(e)}>
                            <option value="AZ"># - Z</option>
                            <option value="ZA">Z - #</option>
                        </select>
                        <select className="select" onChange={e => handleSortByRating(e)}>
                            <option value="LTH">Lower ratings</option>
                            <option value="HTL">Higher ratings</option>
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full m-auto px-8 justify-center items-center gap-4">
                    {currentVideogames[0] === "No games created" ? <NoGamesCreated />
                        : currentVideogames[0] === "No results" ? <InvalidSearch />
                            : currentVideogames.length === 0 ? <Loader />
                                : currentVideogames.map(vg =>
                                    <Link key={vg.id} to={`/videogame/${vg.id}`}>
                                        <Card
                                            name={vg.name}
                                            img={vg.img}
                                            genres={vg.genres}
                                            released={vg.released}
                                            rating={vg.rating} />
                                    </Link>)
                    }
                </div>
            </div>
            <Paginated
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                paginated={paginated} />
        </main>
    )
}