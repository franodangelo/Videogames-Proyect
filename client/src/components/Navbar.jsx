import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./Searchbar";

export default function NavBar() {

    return (
        <div className="flex sticky top-0 z-20 w-full gap-4 p-8 flex-wrap md:flex-nowrap md:max-h-[80px] md:items-center justify-center md:justify-between text-white bg-palette-600 shadow-md shadow-palette-900/30">
            <Link to="/">
                <h1 className="uppercase font-bold tracking-widest">Videogames SPA</h1>
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-2">
                <SearchBar />
                <Link to="/videogame">
                    <button className="primaryButton">Create videogame</button>
                </Link>
            </div>
        </div>
    )
}
