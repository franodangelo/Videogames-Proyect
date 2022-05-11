import React from 'react';
import moduleStyles from '../Styles.module.css';

export default function Card({name, img, released, rating, genres}){
    return(
        <div className={moduleStyles.card}>
            <img src={img} alt="Videogame cover" />
            <div className={moduleStyles.cardContent}>
                <h2 className={moduleStyles.cardSecondaryText}>{rating}</h2>
                <h1 className={moduleStyles.cardHeader}>{name}</h1>
                <h3 className={moduleStyles.cardSecondaryText}>{genres.join(' - ')}</h3>
                <h4 className={moduleStyles.cardSecondaryText}>Released: {released}</h4>
            </div>
        </div>
    )
};