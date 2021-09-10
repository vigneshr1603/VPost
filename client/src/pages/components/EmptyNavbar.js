import React from 'react'
import { Link } from 'react-router-dom'
function EmptyNavbar() {
    return (
        <div>
            <nav id="emptyNavbar" className="navbar  navbar-dark bg-primary">
                <Link to="/" className="navbar-brand" >&nbsp;&nbsp;VPost</Link>
            </nav>
        </div>
    )
}

export default EmptyNavbar
