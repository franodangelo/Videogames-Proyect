import React from 'react';

export default function Card({ name, img, released, rating, genres }) {
    return (
        <div>
            <h2>{rating}</h2>
            <img src={img} alt='Videogame cover' />
            <div>
                <h1>{name}</h1>
                <h3>{genres.join(' - ')}</h3>
                <h4>Released: {released}</h4>
            </div>
        </div>
    )
};