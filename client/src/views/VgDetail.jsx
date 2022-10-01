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
        navigate('/');
    }

    return (
        <main>
            <button className='bg-palette-100 text-sm text-white rounded-tr-lg rounded-br-lg'>
                <Link to='/'><p>Back home</p></Link>
            </button>
            <div className='flex h-screen m-8'>
                <div className='flex flex-col basis-4/12 items-center self-center'>
                    <h1 className='font-bold text-2xl uppercase'>{videogameDetail.name}</h1>
                    <h2>{videogameDetail.genres?.join(" - ")}</h2>
                    <h3>Platforms: {videogameDetail.platforms?.join(", ")} </h3>
                    <h4>Date of released: {videogameDetail.released}</h4>
                    {typeof videogameDetail.id !== 'number'
                        ? <button onClick={() => handleDelete(id)}>Delete videogame</button>
                        : null
                    }
                </div>
                <div className='flex flex-col basis-8/12'>
                    <h4>Rating: {videogameDetail.rating}</h4>
                    <img className='self-end w-auto h-80 object-contain' src={videogameDetail.img} alt="Videogame cover" />
                    <p className='text-sm' dangerouslySetInnerHTML={{ __html: videogameDetail.description }}></p>
                </div>
            </div>
        </main>
    )
};