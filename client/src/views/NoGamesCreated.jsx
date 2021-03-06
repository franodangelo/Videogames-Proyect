import React from 'react';
import moduleStyles from '../Styles.module.css';

export default function NoGamesCreated() {
    return(
        <div className={moduleStyles.invalid}>
            <h1>You don't have any videogame made by yourself yet.</h1>
            <p>Why don't you begin to create some and fill this site with them?</p>
            <p>Press the button <strong>CREATE VIDEOGAME</strong> in the navbar and start creating!</p>
        </div>
    )
}