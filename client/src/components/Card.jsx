export default function Card({ name, img, rating, genres }) {
    return (
        <main className="flex flex-col w-full p-6 justify-center bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg shadow-slate-900 rounded-lg hover:scale-105 ease-in-out duration-300">
            <h2 className="px-2 py-1 mb-2 self-end font-semibold text-xs bg-rose-600">{rating.toFixed(1)}</h2>
            <div className="h-full w-full lg:h-60 xl:h-48 overflow-hidden rounded">
                <img className="w-full h-80 md:h-48 lg:h-72 object-cover" src={img} alt="Videogame cover" />
            </div>
            <h1 className="py-4 font-bold text-2xl md:text-xl lg:text-lg uppercase truncate">{name}</h1>
            <div className="flex flex-wrap gap-1">
                {genres.slice(0, 2)?.map(genre => {
                    return <p className="py-1 px-2 font-semibold text-xs uppercase bg-slate-600">{genre}</p>
                })}
            </div>
            <button className="primaryButton mt-4">More info</button>
        </main>
    )
}