import React from "react";
import { Link } from "react-router-dom";

export default function InvalidPath() {
    return (
        <div >
            <h1>Oops! This route doesn"t exist :/</h1>
            <p>Don"t worry, you can go back to the <strong>Home page</strong> by clicking the button below</p>
            <Link to="/"><button >HOME PAGE</button></Link>
        </div>
    )
}