
import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../helpers/AuthContext';
import { url } from '../../helpers/BaseUrl';
function CommentCard(props) {


    const { authState } = useContext(AuthContext);
    const history = useHistory();
    const deleteComment = (id) => {
        axios
            .delete(url+`/comments/${id}`, {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
            })
            .then(() => {
                history.push("/home");
            });
    }
    return (
        <div><br></br>
            <div className="card" >
                <div className="card-body">
                    <div className="row card-title">
                        <p className="col text-primary mt-2" style={{ marginLeft: '2px' }}>@{props.username}</p>
                    </div>

                    <p className=" position-relative" style={{ marginLeft: '10px' }}>{props.commentText}</p>

                    {authState.username === props.username && (

                        <button className="btn btn-danger btn-sm " onClick={() => deleteComment(props.postId)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    )}
                </div>
            </div>
            <br></br>
        </div>
    )
}

export default CommentCard
