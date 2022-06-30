import React from 'react';
import moduleStyles from '../Styles.module.css';

export default function Paginated({ videogamesPerPage, allVideogames, paginated }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
        pageNumbers.push(i)
    } 
    return (
        <nav>
            <div className={moduleStyles.pages}>
                {pageNumbers.length > 0 && pageNumbers.map(n => (
                    <button className={moduleStyles.page} key={n} onClick={() => paginated(n)}>{n}</button>
                ))}
            </div>
        </nav>
    )
}