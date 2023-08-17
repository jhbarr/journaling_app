import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <h1 className="website--title">Hello There</h1>

            <Link to="/" className="page--option">Home</Link>
            <Link to="/write" className="page--option">Write</Link>
            <Link to="/reflect" className="page--option">Reflect</Link>

        </header>
    )
}

