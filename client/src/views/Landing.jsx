import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
    return(
        <div>
            <h1>Check out the greatest videogames of all time!</h1>
            <p>Find all the video games that the world is currently talking about, the all-time classics on each platform, and more. Do you want to enter and see what this site is about?</p>
            <Link to='/home'><button>Enter</button></Link>
        </div>
    )
}