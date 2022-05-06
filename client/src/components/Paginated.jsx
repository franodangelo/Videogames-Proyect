import React from "react";

export default function Paginated({ videogamesPerPage, allVideogames, paginated }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <div>
                {pageNumbers.length > 0 && pageNumbers.map(n => (
                    <button key={n} onClick={() => paginated(n)}>{n}</button>
                ))}
            </div>
        </nav>
    )
}