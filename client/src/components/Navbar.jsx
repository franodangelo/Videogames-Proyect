import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './Searchbar';

export default function Navbar() {

    const [nav, setNav] = useState(false);

    const handleNav = () => {
        setNav(!nav);
    };

    return (
        <div className='flex w-full max-h-[80px] items-center justify-between px-8 py-8 text-white bg-palette-600 shadow-md shadow-palette-900/30'>
            <Link to='/home'><h1 className='uppercase font-bold tracking-widest'>Videogames SPA</h1></Link>
            <div className='flex justify-between gap-8'>
                <SearchBar />
                <Link to='/videogame'><button>Create videogame</button></Link>
            </div>
        </div>
        
    )
};
