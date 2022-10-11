import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../redux/actions";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

export default function NavBar() {
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
        <nav className="flex sticky top-0 z-20 w-full gap-4 px-8 py-4 md:max-h-[80px] justify-evenly md:justify-between text-white bg-slate-900 shadow-md shadow-slate-900/50">
            <Link to="/" className="hidden md:flex items-center">
                <img src="https://videogamesspa.vercel.app/static/media/finalLogo.a56c40d2.svg" class="mr-2 h-6" alt="Gameon Logo" />
                <span className="self-center text-xl font-semibold">Gameon</span>
            </Link>
            <div className="flex justify-between items-center gap-4">
                <Link to="/" className="md:hidden items-center">
                    <img src="https://videogamesspa.vercel.app/static/media/finalLogo.a56c40d2.svg" class="h-6" alt="Gameon Logo" />
                </Link>
                <div className="relative h-full flex">
                    <input className="w-[160px] md:w-full px-4 text-sm text-white placeholder-slate-400 bg-slate-700 border border-rose-700 focus:ring-rose-500 focus:border-rose-500"
                        placeholder="Search game..."
                        type="text"
                        id="input"
                        onChange={(e) => handleInputChange(e)}
                        onSubmit={(e) => handleSearchSubmit(e)}
                    />
                    <div className="secondaryButton flex w-10 p-0 items-center justify-center cursor-pointer" onClick={(e) => handleSearchSubmit(e)}>
                        <HiSearch />
                    </div>
                </div>
                <Link to="/videogame">
                    <button className="primaryButton text-xs md:text-base">Create game</button>
                </Link>
            </div>
        </nav>
    )
}
