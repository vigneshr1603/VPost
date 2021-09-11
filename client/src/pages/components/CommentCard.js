
import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../helpers/AuthContext';
import { url } from '../../helpers/BaseUrl';
import Swal from 'sweetalert2';
function CommentCard(props) {


    const { authState } = useContext(AuthContext);
    const history = useHistory();
    const deleteComment = (id) => {
        axios
            .delete(url + `/comments/${id}`, {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
            })
            .then(() => {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    html:
                        'Comment has been deleted!',
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    focusConfirm: false,
                    timer: 1000
                })
                history.push("/home");
            });
    }
    return (
        <div>
            <div className="card p-2 mb-4" >
                <div className="card-body ">
                    <div className="card-text row">
                        <p className="col text-start">{props.commentText}</p>
                        {authState.username === props.username && (<i className="col fas fa-trash text-danger text-end" onClick={() => deleteComment(props.postId)} style={{cursor:'pointer'}} data-toggle="tooltip" data-placement="top" title="Delete comment"></i>)}
                    </div>
                    <p className=" card-text text-end text-muted"> ~{props.username}</p>
                </div>
            </div>
        </div>
    )
}

export default CommentCard