import React from 'react';
import { Link } from 'react-router-dom';

export default function InvalidPath() {
    return(
        <div>
            <h1>Oops! There are no videogames here :(</h1>
            <p>Don't worry, you can go to the Home page by clicking the button below</p>
            <Link to='/home'><button className='button'>Go to Home page</button></Link>
        </div>
    )
}