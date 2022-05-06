import React from 'react';

export default function Card({name, img, released, rating, genres}){
    return(
        <div>
            <h2>{name}</h2>
            <img src={img} width="200px" height="160px" alt="fotito" />
            <h4>Rate: {rating}</h4>
            <p>Genres: {genres.join(', ')}</p>
            <p>Date of release: {released}</p>
        </div>
    )
};