import React from "react";

export default function Card({ name, img, rating, genres }) {
    return (
        <main className="flex flex-col w-full px-4 py-8 justify-center rounded-lg bg-shades-500 shadow-lg shadow-palette-600/50">
            <h2 className="mb-2 px-2 py-1 self-end text-xs text-white bg-palette-100 rounded-full">{rating}</h2>
            <div className="h-full w-full lg:h-60 xl:h-48 overflow-hidden rounded-lg">
                <img className="h-80 md:h-48 lg:h-72 w-full object-cover" src={img} alt="Videogame cover" />
            </div>
            <h1 className="py-2 font-bold text-lg text-white uppercase truncate">{name}</h1>
            <h3 className="text-sm text-white">{genres.slice(0, 3).join(" - ")}</h3>
            <button className="mt-4">Show detail</button>
        </main>
    )
}