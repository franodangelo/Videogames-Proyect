import React from 'react';
import { Link } from 'react-router-dom';
import moduleStyles from '../Styles.module.css';

export default function InvalidPath() {
    return(
        <div className={moduleStyles.invalid}>
            <h1>Oops! This route doesn't exist :/</h1>
            <p>Don't worry, you can go back to the <strong>Home page</strong> by clicking the button below</p>
            <Link to='/home'><button className={moduleStyles.button}>HOME PAGE</button></Link>
        </div>
    )
}