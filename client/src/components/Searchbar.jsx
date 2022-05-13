import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameVideogame } from '../redux/actions';

import moduleStyles from '../Styles.module.css';

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
    }

    return(
        <div className={moduleStyles.searchbar}>
            <input className={moduleStyles.searchInput} onChange={(e) => handleInputChange(e)} type= 'text' placeholder='Start searching...'></input>
            <button className={moduleStyles.searchButton} onClick={(e) => handleSearchSubmit(e)} type='submit'>Search</button>
        </div>
    )
};