import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogameDetail } from '../redux/actions';
import { Link } from 'react-router-dom';

export default function VideogameDetail() {
    let videogameDetail = useSelector((state) => state.videogameDetail);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getVideogameDetail(id));
    }, [dispatch, id])

    return(
        <div>
            <Link to='/home'><button>Back home</button></Link>
            <h1>{videogameDetail.name}</h1>
            <img src={videogameDetail.img} width="800" height="600" alt="imagen del videojuego" />
            <p>Genres: {videogameDetail.genres?.join(", ")}</p>
            <p>Platforms: {videogameDetail.platforms?.join(", ")} </p>
            <span>Rating: {videogameDetail.rating}</span>
            <h3>Date of released: {videogameDetail.released}</h3>
            <p>Description: {videogameDetail.description}</p>
        </div>
    )
}