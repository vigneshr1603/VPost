import React from 'react';
import { Link } from 'react-router-dom';
function UserCard(props) {
    return (
        <div className="card" >
            <div className="card-header bg-transparent text-muted">@{props.username}</div>
            <div className="card-body">
                <h5 className="card-title"><i className="fa fa-user"></i>&nbsp;{props.name}</h5>
                <p className="card-title"><i className="fa fa-sticky-note" aria-hidden="true"></i> No of posts : {props.postCount}</p>
            </div>
            <div className="card-footer bg-transparent">
                <Link className="card-link" to={props.userlink}>View posts</Link>
            </div>
        </div>
    )
}

export default UserCard
