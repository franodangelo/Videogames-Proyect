import React from 'react';
import moduleStyles from '../Styles.module.css';

export default function Loader() {
    return(
        <div className={moduleStyles.invalid}>
            <div className={moduleStyles.loader}></div>
        </div>
    )
}