import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getVideogameDetail } from '../redux/actions';
import { Link, useNavigate } from 'react-router-dom';
import { deleteVideogame } from '../redux/actions';

export default function VideogameDetail() {
    let videogameDetail = useSelector((state) => state.videogameDetail);
    const dispatch = useDispatch();
    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getVideogameDetail(id));
    }, [dispatch, id])

    function handleDelete(id) {
        dispatch(deleteVideogame(id));
        alert('Your videogame was deleted correctly')
        navigate('/home');
    }

    return (
        <main>
            <div>
                <div>
                    <Link to='/home'><h1>{'<'} Back home</h1></Link>
                </div>
                <div>
                    <Link to='/videogame'><button>Create videogame</button></Link>
                </div>
            </div>
            <div>
                <div>
                    <h1>{videogameDetail.name}</h1>
                    <h2>{videogameDetail.genres?.join(" - ")}</h2>
                    <h3>Platforms: {videogameDetail.platforms?.join(", ")} </h3>
                    <h4>Date of released: {videogameDetail.released}</h4>
                    {typeof videogameDetail.id !== 'number'
                        ? <button onClick={() => handleDelete(id)}>DELETE VIDEOGAME</button>
                        : null
                    }
                </div>
                <div>
                    <h4>Rating: {videogameDetail.rating}</h4>
                    <img src={videogameDetail.img} alt="Videogame cover" />
                    <p dangerouslySetInnerHTML={{ __html: videogameDetail.description }}></p>
                </div>
            </div>
            <div>
                <ul>
                    <li><a href="https://www.linkedin.com/in/franco-dangelo/">Linkedin</a></li>
                    <li><a href="https://github.com/franodangelo">GitHub</a></li>
                </ul>
                <h1>Created by Franco D'Angelo - 2022</h1>
            </div>
        </main>
    )
};