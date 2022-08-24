import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogame } from '../redux/actions';

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
        <div className='flex gap-2 items-center'>
            <input className='h-full pl-2 border-2 border-palette-800 rounded-md placeholder-white bg-palette-800/20' onChange={(e) => handleInputChange(e)} type='text' placeholder='Find your videogame...'></input>
            <button className='bg-palette-100 text-white rounded-tr-lg rounded-br-lg' onClick={(e) => handleSearchSubmit(e)} type='submit'>Search</button>
        </div>
    )
};