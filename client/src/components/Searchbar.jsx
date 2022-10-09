import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../redux/actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchName, setSearchName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setSearchName(e.target.value);
    }

    function handleSearchSubmit(e) {
        e.preventDefault();
        dispatch(getNameVideogame(searchName));
        setSearchName("");
    }

    return (
        <div className="flex gap-2 items-center">
            <input className="h-full py-2 px-4 border-2 border-slate-800 text-sm md:text-base lg:text-lg placeholder-white/90 bg-slate-800/20"
                type="text" placeholder="Find your videogame..."
                onChange={(e) => handleInputChange(e)}>
            </input>
            <button className="secondaryButton" onClick={(e) => handleSearchSubmit(e)} type="submit">Search</button>
        </div>
    )
}