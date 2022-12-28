import { useState } from "react";
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
        <nav className="flex sticky top-0 z-20 w-full h-[80px] px-6 md:px-8 py-4 gap-4 justify-evenly md:justify-between items-center text-white bg-slate-800 shadow-md shadow-slate-900">
            <Link to="/" className="hidden md:flex gap-2 items-center">
                <img src="/client/public/finalLogo.svg" class="w-6 h-6" alt="Gameon Logo" />
                <span className="self-center font-semibold text-xl">Gameon</span>
            </Link>
            <div className="flex w-full h-fit justify-end items-center gap-4 md:gap-8">
                {/* <Link to="/" className="md:hidden items-center">
                    <img src="/client/public/finalLogo.svg" class="w-2 h-2" alt="Gameon Logo" />
                </Link> */}
                <div className="flex w-60 sm:w-[360px] max-w-[400px] h-8 md:h-10">
                    <input
                        className="w-full px-4 text-sm text-white placeholder-slate-400 bg-slate-700 border border-rose-700 focus:ring-rose-500 focus:border-rose-500"
                        placeholder="Search game..."
                        type="text"
                        id="input"
                        onChange={(e) => handleInputChange(e)}
                        onSubmit={(e) => handleSearchSubmit(e)}
                    />
                    <div
                        className="secondaryButton flex w-10 p-0 items-center justify-center cursor-pointer"
                        onClick={(e) => handleSearchSubmit(e)}>
                        <HiSearch />
                    </div>
                </div>
                <Link to="/videogame">
                    <button className="primaryButton">Create game</button>
                </Link>
            </div>
        </nav>
    )
}
