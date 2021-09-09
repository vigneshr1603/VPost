import React from 'react'
import { Link } from 'react-router-dom'

function PostCard(props) {


  const truncate = (string, len) => {
    return string.slice(0, len) + "..."
  }
  return (
    <Link to={props.postLink} >
      <div className="req card text-center text-dark">
        <div className="card-body">
          <h5 className="card-title fw-bold">{props.title}</h5>
          <p className="card-text">{truncate(props.postText, 30)}</p>
          <p className="card-text">
            <small className="text-muted">posted by {props.username}</small>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default PostCard

