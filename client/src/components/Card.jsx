import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Card({ name, img, rating, genres }) {
    return (
        <main className="flex flex-col w-full px-4 py-8 justify-center bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg shadow-rose-900/20 rounded-lg hover:scale-105 ease-in-out duration-300">
            <h2 className="mb-2 px-2 py-1 self-end font-semibold text-xs bg-rose-600">{rating.toFixed(1)}</h2>
            <div className="h-full w-full lg:h-60 xl:h-48 overflow-hidden rounded">
                <img className="h-80 md:h-48 lg:h-72 w-full object-cover" src={img} alt="Videogame cover" />
            </div>
            <h1 className="py-2 font-bold text-2xl md:text-xl lg:text-lg uppercase truncate">{name || <Skeleton />}</h1>
            <div className="flex flex-wrap gap-2">
                {genres.slice(0, 3)?.map(genre => {
                    return <p className="py-1 px-2 font-semibold text-xs uppercase bg-slate-600">{genre}</p>
                })}
            </div>
            <button className="primaryButton mt-4">Show detail</button>
        </main>
    )
}