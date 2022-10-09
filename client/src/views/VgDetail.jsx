import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVideogameDetail, deleteVideogame } from "../redux/actions";
import { HiLink } from "react-icons/hi";

export default function VideogameDetail() {
    let videogameDetail = useSelector(state => state.videogameDetail);
    const dispatch = useDispatch();
    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getVideogameDetail(id));
    }, [dispatch, id])

    function handleDelete(id) {
        dispatch(deleteVideogame(id));
        alert("Your videogame was deleted correctly")
        navigate("/");
    }

    return (
        // <main className="flex flex-col lg:flex-row min-h-screen w-full my-auto items-center bg-shades-600 md:bg-shades-600/90">
        //     <div className="-z-10 invisible md:visible absolute w-full h-full">
        //         <img className="w-full h-full object-cover"
        //             src={videogameDetail.img}
        //             alt={`${videogameDetail.name} thumbnail`} />
        //     </div>
        //     <section className="flex lg:flex-col lg:basis-6/12 p-8">
        //         <div className="flex flex-col">
        //             <h4 className="text-sm text-start tracking-widest">{videogameDetail.released}</h4>
        //             <h1 className="py-4 font-bold text-2xl md:text-3xl lg:text-4xl text-palette-900 uppercase">{videogameDetail.name}</h1>
        //             <h2 className="font-thin text-lg md:text-xl">{videogameDetail.genres}</h2>
        //             <p className="py-4 md:text-sm" dangerouslySetInnerHTML={{ __html: videogameDetail.description }} />
        //             {typeof videogameDetail.id !== "number"
        //                 ? <button onClick={() => handleDelete(id)}>Delete videogame</button>
        //                 : null
        //             }
        //         </div>
        //     </section>
        //     <section className="flex flex-col lg:basis-6/12 p-8 self-center">
        //         <h4 className="z-10 w-fit -mb-12 mr-4 px-2 py-1 self-end font-bold text-sm -lg bg-palette-100">{videogameDetail.rating}</h4>
        //         <div className="w-full overflow-hidden -xl mb-4 shadow-lg shadow-shades-800">
        //             <img className="w-full object-cover"
        //                 src={videogameDetail.img}
        //                 alt={`${videogameDetail.name} thumbnail`} />
        //         </div>
        //         <p className="uppercase">{videogameDetail.ratings}</p>
        //         <h3 className="font-thin">Available in {videogameDetail.platforms}</h3>
        //     </section>
        // </main>
        <main className="relative">
            <img className="absolute w-full h-full object-cover" src={videogameDetail.bgImgDetail} alt={`${videogameDetail.name} thumbnail`} />
            <div className="relative grid grid-cols-1 md:grid-cols-2 w-full h-full p-10 gap-10 bg-slate-900/90">
                <section className="col-span-2 md:col-span-1 flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
                        <div className="flex flex-col lg:flex-row w-fit gap-1 px-2 py-1 text-xs uppercase bg-slate-600">
                            <p>Available in:</p>
                            {videogameDetail.platforms?.join(" - ")}
                        </div>
                        <div className="flex w-fit gap-2">
                            <p className="px-2 py-1 items-center text-xs uppercase bg-slate-600">{videogameDetail.rating}</p>
                            <p className="px-2 py-1 items-center text-xs uppercase bg-slate-600">{videogameDetail.esrbRating}</p>
                        </div>
                    </div>
                    <img className="h-60 md:h-full object-cover rounded-lg" src={videogameDetail.img} alt={`${videogameDetail.name} thumbnail`} />
                </section>
                <section className="col-span-2 md:col-span-1 flex flex-col items-center justify-center gap-4">
                    <div className="flex flex-col w-full items-center md:items-start p-10 gap-2 bg-slate-800 rounded-lg">
                        <div className="flex flex-col lg:flex-row w-fit gap-1 px-2 py-1 text-center text-xs uppercase bg-slate-600">
                            {videogameDetail.developedBy?.join(" - ")}
                        </div>
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center md:text-start uppercase">{videogameDetail.name}</h1>
                            <a href={videogameDetail.website} target="_blank" rel="noreferrer">
                                <HiLink />
                            </a>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {videogameDetail.genres?.map(genre => {
                                return <p className="py-1 px-2 text-xs uppercase text-slate-800 bg-slate-200">{genre}</p>
                            })}
                        </div>
                        <div className="flex gap-2">
                            <p className="uppercase">Metacritic {videogameDetail.metacritic}</p>
                            <a href={videogameDetail.metacriticURL}>(more detail)</a>
                        </div>
                    </div>
                    <p className="text-sm">{videogameDetail.description}</p>
                </section>
                <section className="col-span-2">
                    <div className="flex flex-wrap gap-2">
                        {videogameDetail.tags?.map(tag => {
                            return <p className="py-1 px-2 text-xs uppercase bg-slate-600">{tag}</p>
                        })}
                    </div>
                </section>
            </div>
        </main>
    )
}