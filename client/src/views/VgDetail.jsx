import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVideogameDetail, deleteVideogame, cleanState } from "../redux/actions";
import { HiLink, HiCalendar, HiOutlineInformationCircle } from "react-icons/hi";
import Loader from "./Loader";
import { useState } from "react";

export default function VideogameDetail() {
    let videogameDetail = useSelector(state => state.videogameDetail);
    const dispatch = useDispatch();
    const { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        dispatch(getVideogameDetail(id));
        dispatch(cleanState());
    }, [dispatch, id])

    const [shownInfo, setShownInfo] = useState(false);

    function handleDelete(id) {
        dispatch(deleteVideogame(id));
        alert("Your videogame was deleted correctly")
        navigate("/");
    }

    return (
        <main className="relative h-full">
            {videogameDetail.name ?
                <div><img className="absolute w-full h-full object-cover" src={videogameDetail.bgImgDetail} alt={`${videogameDetail.name} thumbnail`} />
                    <div className="relative grid grid-cols-1 md:grid-cols-2 w-full h-full min-h-screen p-6 md:p-8 gap-10 bg-slate-900/90">
                        <section className="col-span-2 md:col-span-1 flex flex-col gap-4">
                            <div className="flex flex-row gap-2 justify-between">
                                <div className="flex w-fit gap-2">
                                    <div className="static flex mr-2 gap-1 items-center">
                                        <a href={videogameDetail.metacriticURL} target="_blank" rel="noreferrer">
                                            <div className="flex px-2 py-1 gap-1 bg-slate-200">
                                                <img className="w-4 h-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Metacritic.svg/1024px-Metacritic.svg.png" alt="metacritic thumbnail" />
                                                <p className="text-xs text-slate-800">Metascore {videogameDetail.metacritic}</p>
                                            </div>
                                        </a>
                                        <HiOutlineInformationCircle className="cursor-pointer"
                                            onMouseEnter={() => setShownInfo(true)}
                                            onMouseLeave={() => setShownInfo(false)} />
                                        {shownInfo && (
                                            <div className="absolute flex flex-col w-[360px] md:w-[400px] mt-[224px] mx-auto py-2 px-4 text-sm bg-slate-200">
                                                <p className="text-slate-800">A <strong className="text-slate-800">metascore</strong> is a weighted average of reviews from top critics and publications for a given video game.</p>
                                                <h6 className="mt-2 font-semibold text-slate-800 uppercase">General meaning of this score</h6>
                                                <ul className="flex flex-col">
                                                    <li className="text-slate-800"><strong className="text-slate-800">Universal Acclaim</strong>: 90-100</li>
                                                    <li className="text-slate-800"><strong className="text-slate-800">Generally Favorable Reviews</strong>: 75-89</li>
                                                    <li className="text-slate-800"><strong className="text-slate-800">Mixed on Average Reviews</strong>: 50-74</li>
                                                    <li className="text-slate-800"><strong className="text-slate-800">Generally Unfavorable Reviews</strong>: 20-49</li>
                                                    <li className="text-slate-800"><strong className="text-slate-800">Overwhelming Dislike</strong>: 0-19</li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <p className="flex px-2 py-1 text-xs uppercase bg-slate-600">{videogameDetail.esrbRating}</p>
                                </div>
                                <p className="flex px-2 py-1 font-semibold text-xs uppercase bg-rose-600">{videogameDetail.rating}</p>
                            </div>
                            <img className="h-60 md:h-full object-cover rounded-lg shadow-xl shadow-slate-900" src={videogameDetail.img} alt={`${videogameDetail.name} thumbnail`} />
                        </section>
                        <section className="col-span-2 md:col-span-1 flex flex-col items-center gap-4">
                            <div className="flex flex-col w-full items-center md:items-start p-10 gap-2 bg-slate-800 rounded-lg shadow-lg shadow-slate-900">
                                <div className="flex flex-col lg:flex-row w-fit text-center md:text-start text-xs">
                                    {videogameDetail.developedBy?.join(" - ")}
                                </div>
                                <div className="flex items-center gap-4">
                                    <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-center md:text-start uppercase">{videogameDetail.name}</h1>
                                    <a href={videogameDetail.website} target="_blank" rel="noreferrer">
                                        <HiLink />
                                    </a>
                                </div>
                                <div className="flex items-center gap-1">
                                    <HiCalendar className="w-4 h-4" />
                                    <h2 className="text-start text-xs tracking-wide">{videogameDetail.released}</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {videogameDetail.genres?.map(genre => {
                                        return <p className="py-1 px-2 font-semibold text-xs uppercase bg-rose-600">{genre}</p>
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-col w-full md:w-fit md:self-start px-2 py-1 bg-slate-200">
                                <p className="text-xs text-start text-slate-800">Available in: {videogameDetail.platforms?.join(" - ")}</p>
                            </div>
                            <p className="text-sm">{videogameDetail.description}</p>
                        </section>
                        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full col-span-2 gap-4">
                            {videogameDetail.screenshots?.map(screenshot => <img className="w-full h-60 object-cover rounded-lg shadow-md shadow-slate-900" src={screenshot} alt="" />)}
                        </section>
                        <section className="col-span-2">
                            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                {videogameDetail.tags?.map(tag => {
                                    return <p className="py-1 px-2 text-xs uppercase bg-slate-600">{tag}</p>
                                })}
                            </div>
                            {typeof videogameDetail.id !== "number"
                                ? <button onClick={() => handleDelete(id)}>Delete videogame</button>
                                : null
                            }
                        </section>
                        {videogameDetail.gameSeries.length > 0 ?
                            <section className="flex flex-col col-span-2 p-8 gap-4 rounded-lg bg-slate-800 shadow-md shadow-slate-900">
                                <h2 className="font-bold text-base md:text-xl lg:text-2xl text-center md:text-start">Games related to "{videogameDetail.name}"</h2>
                                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 rounded-lg bg-slate-800">
                                    {videogameDetail.gameSeries?.map(game => {
                                        return <div className="flex flex-col h-60">
                                            <img className="w-full h-full object-cover" src={game.img} alt={`${game.name} thumbnail`} />
                                            <h6 className="py-2 text-sm text-center truncate">{game.name}</h6>
                                        </div>
                                    })}
                                </div>
                            </section> : null
                        }
                    </div>
                </div> : <div className="pt-40 md:pt-24 bg-slate-900"><Loader /></div>}
        </main>
    )
}