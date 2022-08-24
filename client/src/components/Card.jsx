import React from 'react';

export default function Card({ name, img, released, rating, genres }) {
    return (
        <main className='flex flex-col h-160 md:h-120 lg:h-80 w-full px-4 py-8 justify-center bg-shades-500/20 shadow-lg shadow-palette-600/50'>
            <div className='flex justify-end'>
                <h2 className='font-mono font-bold -tracking-widest'>{rating}</h2>
            </div>
            <div className='h-full w-full lg:h-60 xl:h-48 overflow-hidden'>
                <img className='h-80 md:h-48 lg:h-72 w-full object-cover' src={img} alt='Videogame cover' />
            </div>
            <div>
                <h1 className='font-bold uppercase'>{name}</h1>
                <h3>{genres.join(' - ')}</h3>
                <h4>Released: {released}</h4>
            </div>
        </main>
    )
};