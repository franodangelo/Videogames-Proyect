import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getVideogameDetail, deleteVideogame } from "../redux/actions";

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
        <main className="mx-8 my-4">
            <button className="m-auto bg-palette-100 text-sm text-white rounded-tr-lg rounded-br-lg">
                <Link to="/">
                    <p>Back home</p>
                </Link>
            </button>
            <div className="flex h-screen">
                <div className="flex flex-col basis-4/12 self-center">
                    <h4 className="text-sm">{videogameDetail.released}</h4>
                    <div className="flex py-2 gap-6">
                        <h1 className="font-bold text-5xl uppercase">{videogameDetail.name}</h1>
                    </div>
                    <h2 className="py-2 font-thin text-2xl">{videogameDetail.genres?.join(" - ")}</h2>
                    <h3 className="py-2 text-lg">{videogameDetail.platforms?.join(", ")}</h3>
                    {typeof videogameDetail.id !== "number"
                        ? <button onClick={() => handleDelete(id)}>Delete videogame</button>
                        : null
                    }
                </div>
                <div className="flex flex-col basis-8/12">
                    <h4 className="z-40 w-fit -mb-12 mr-4 px-2 py-1 self-end font-bold text-sm text-white rounded-lg bg-palette-100">{videogameDetail.rating}</h4>
                    <div className="w-full overflow-hidden rounded-lg">
                        <img className="w-[full] object-cover"
                            src={videogameDetail.img}
                            alt={`${videogameDetail.name} thumbnail`} />
                    </div>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: videogameDetail.description }} />
                </div>
            </div>
        </main>
    )
};