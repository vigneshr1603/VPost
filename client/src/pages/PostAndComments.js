import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CommentCard from './components/CommentCard';
import Navbar from './components/Navbar'
import { AuthContext } from '../helpers/AuthContext';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2'
import { url } from '../helpers/BaseUrl';
function PostAndComments(props) {
    let { id } = useParams();
    const [post, setPost] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([])
    const { authState } = useContext(AuthContext);
    const [btndisabled, setBtnDisabled] = useState(false);
    const history = useHistory();
    const deletePost = (id) => {
        axios
            .delete(url + `/posts/${id}`, {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
            })
            .then((response) => {
                if (response.data === 'DELETED') {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        html:
                            'Post has been deleted',
                        showCloseButton: false,
                        showCancelButton: false,
                        showConfirmButton: false,
                        focusConfirm: false,
                        timer: 2000
                    })
                    history.push("/home");
                }
            });
    };
    const editPost = (id) => {
        history.push("/edit/" + id);
    }
    const addComment = () => {
        if (commentText.length === 0) return;
        setBtnDisabled(true);
        axios
            .post(
                url + "/comments/addComment",
                {
                    commentText: commentText,
                    PostId: id,
                },
                {
                    headers: {
                        accessToken: sessionStorage.getItem("accessToken"),
                    },
                }
            )
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error);
                } else {
                    const newComment = {
                        id: response.data.commentId,
                        commentText: commentText,
                        username: response.data.username
                    };
                    setComments([...comments, newComment]);
                    setCommentText("");
                }
            });
        setBtnDisabled(false);
    };

    useEffect(() => {
        axios.get(url + `/posts/getpostbypostid/${id}`, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (!response.data || response.data.error) { history.push("/"); }
            else {
                setPost(response.data);
            }
        });

        axios.get(url + `/comments/getComments/${id}`, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (!response.data || response.data.error) { history.push("/"); }
            else {
                setComments(response.data);
            }
        })
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <br></br>
                <div className="card">
                    <div className="card-body ">
                        <div className="card-text row">
                            <div className="col text-start">
                                <h5>{post.title}</h5>
                                <h6>{post.postText}</h6>
                            </div>
                            {authState.username === post.username && (<i className="fas fa-pencil-alt text-success text-end" style={{ cursor: 'pointer', width: 'fit-content', height: 'fit-content' }} onClick={() => editPost(post.id)} data-toggle="tooltip" data-placement="top" title="Edit post"></i>)}

                            {authState.username === post.username && (<i className="fas fa-trash text-danger text-end " style={{ cursor: 'pointer', width: 'fit-content', height: 'fit-content' }} onClick={() => deletePost(post.id)} data-toggle="tooltip" data-placement="top" title="Delete post"></i>)}

                        </div>
                        <p className=" card-text text-end text-muted"> posted by {post.username}</p>
                    </div>
                </div>
                <br></br>
                <input type="text" className="form-control" value={commentText} onChange={(event) => { setCommentText(event.target.value); }} placeholder="Add a comment..." maxLength='100'></input><br></br>
                <button className=" btn btn-primary" onClick={addComment} disabled={commentText.length < 1 || btndisabled}>Add Comment</button>
            </div>
            <div className="container">
                <br></br>

                {comments.length > 0 && <h2 className="mb-4" style={{ fontFamily: "'Patua One', cursive" }}>Comments</h2>}
                <div className="row">
                    {comments.reverse().map((value, key) => {
                        return (
                            <li key={key}>
                                <CommentCard username={value.username} postId={value.id} commentText={value.commentText} ></CommentCard>
                            </li>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default PostAndComments
