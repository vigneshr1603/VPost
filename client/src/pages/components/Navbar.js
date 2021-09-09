import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router';
function Navbar() {
    const history=useHistory();
    const logout = () =>{
        sessionStorage.removeItem("accessToken"); 
        history.push("/");
    }
    return (
        <div>
            <nav id="userNavbar" className="navbar navbar-expand-lg  navbar-dark bg-primary navbar-custom">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <Link to="/home" className="d-block d-md-none p-2 bg-primary text-light">&nbsp;&nbsp;<i className="fas fa-home pr-2"></i></Link>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <Link to="/" className="navbar-brand" >&nbsp;&nbsp;VPost</Link>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">&nbsp;&nbsp;<i className="fas fa-home"></i> Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">&nbsp;&nbsp;<i className="fas fa-user"></i> Users</Link>

                        </li>
                        <li className="nav-item">
                            <Link to="/addpost" className="nav-link">&nbsp;&nbsp;<i className="fas fa-cloud"></i> Add Post</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/settings" className="nav-link">&nbsp;&nbsp;<i className="fas fa-cog"></i> Settings</Link>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        &nbsp; <button id="logoutButton" className="btn btn-outline-light my-2 my-sm-0" onClick={logout} type="button"><i
                            className="fa fa-sign-out-alt pr-1" type="button" ></i>Logout</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
