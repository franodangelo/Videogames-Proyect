import React from 'react';

import moduleStyles from '../Styles.module.css';

export default function InvalidSearch() {
    return(
        <div className={moduleStyles.invalid}>
            <h1>Your search has no results yet</h1>
            <p>Try again using another words to look for the videogame you want</p>
        </div>
    )
}