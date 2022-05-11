import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogameDetail } from '../redux/actions';
import { Link } from 'react-router-dom';

import moduleStyles from '../Styles.module.css';

export default function VideogameDetail() {
    let videogameDetail = useSelector((state) => state.videogameDetail);
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getVideogameDetail(id));
    }, [dispatch, id])

    return(
        <div className={moduleStyles.main}>
            <div className={moduleStyles.nav}>
                <div className={moduleStyles.navleft}>
                    <Link to='/home'><h1>Back home</h1></Link>
                </div>
                <div className={moduleStyles.navRight}>
                    <Link to='/videogame'><button className={moduleStyles.button}>Create videogame</button></Link>
                </div>
            </div>
            <div className={moduleStyles.gamedetail}>
                <div className={moduleStyles.gameinfo}>
                    <h1>{videogameDetail.name}</h1>
                    <h2>{videogameDetail.genres?.join(" - ")}</h2>
                    <h3>Platforms: {videogameDetail.platforms?.join(", ")} </h3>
                    <h4>Date of released: {videogameDetail.released}</h4>
                </div>
                <div className={moduleStyles.gamecover}>
                    <h4>Rating: {videogameDetail.rating}</h4>
                    <img src={videogameDetail.img} alt="Videogame cover" />
                    {/* <p>{videogameDetail.description}</p> */}
                    <p dangerouslySetInnerHTML={{__html: videogameDetail.description}}></p>
                </div>
            </div>
            <div className={moduleStyles.footer}>
                <ul>
                    <li><a href="https://www.linkedin.com/in/franco-dangelo/">Linkedin</a></li>
                    <li><a href="https://github.com/franodangelo">GitHub</a></li>
                </ul>
                <h1>Created by Franco D'Angelo - 2022</h1>
            </div>
        </div>
    )
}