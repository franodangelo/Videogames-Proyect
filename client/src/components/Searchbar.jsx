import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogame } from '../redux/actions';

export default function SearchBar({setCurrentPage}) {
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
        setCurrentPage(1);
    }

    return(
        <div>
            <input onChange={(e) => handleInputChange(e)} type= 'text' placeholder='Start searching...'></input>
            <button onClick={(e) => handleSearchSubmit(e)} type='submit'>Search</button>
        </div>
    )
};