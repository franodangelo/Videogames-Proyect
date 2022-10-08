import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogames, filterByCreation, filterByGenre, orderByName, orderByRating } from "../redux/actions";

export default function ActionBar() {

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    
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
    
    const [order, setOrder] = useState("");

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
        <div className="flex w-full items-center justify-center p-4 gap-8 md:justify-end">

            <button
                className="text-sm bg-transparent border-2 border-palette-900 text-palette-900"
                onClick={handleReset}>
                Reset filters & sorts
            </button>

            <section className="flex flex-col">
                <h4 className="text-center">Filters</h4>
                <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <label className="uppercase font-thin text-sm" for="type">Type</label>
                        <select className="p-2 w-40 text-sm  bg-palette-900/50 border-2 border-palette-900"
                            onChange={handleFilterByCreation}
                            name="type"
                            id="type"
                        >
                            <option value="all">All videogames</option>
                            <option value="created">Created by user</option>
                            <option value="original">Original</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <label className="uppercase font-thin text-sm" for="genres">Genre</label>
                        <select className="p-2 w-40 text-sm  bg-palette-900/50 border-2 border-palette-900"
                            onChange={handleFilterByGenre}
                            name="genres"
                            id="genres"
                        >
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
                </div>
            </section>

            <section className="flex flex-col">
                <h4 className="text-center">Sorts</h4>
                <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-2">
                        <label className="uppercase font-thin text-sm" for="alphabet">Alphabetically</label>
                        <select className="p-2 w-40 text-sm  bg-palette-900/50 border-2 border-palette-900"
                            onChange={e => handleSortByName(e)}
                            name="alphabet"
                            id="alphabet"
                        >
                            <option value="AZ"># - Z</option>
                            <option value="ZA">Z - #</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <label className="uppercase font-thin text-sm" for="ratings">By rating</label>
                        <select className="p-2 w-40 text-sm  bg-palette-900/50 border-2 border-palette-900"
                            onChange={e => handleSortByRating(e)}
                            name="ratings"
                            id="ratings"
                        >
                            <option value="LTH">Lower ratings</option>
                            <option value="HTL">Higher ratings</option>
                        </select>
                    </div>
                </div>
            </section>

        </div>
    )
}