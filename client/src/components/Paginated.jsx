import React from 'react';

export default function Paginated({ videogamesPerPage, allVideogames, paginated }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <div className="flex gap-4">
                {pageNumbers.length > 0 && pageNumbers.map(n => (
                    <button className="py-2 bg-transparent border border-palette-900 text-palette-900 active:bg-palette-900 hover:bg-palette-900 hover:text-white ease-in-out duration-200"
                        key={n}
                        onClick={() => paginated(n)}>{n}
                    </button>
                ))}
            </div>
        </nav>
    )
}