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
    const history = useHistory();
    const deletePost = (id) => {
        axios
            .delete(url + `/posts/${id}`, {
                headers: { accessToken: sessionStorage.getItem("accessToken") },
            })
            .then(() => {
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
            });
    };

    const addComment = () => {
        if (commentText.length === 0) return;
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
                        commentText: commentText,
                        username: response.data.username,
                        imageUrl: 'https://www.atozserwisplus.pl/images/user.png'
                    };
                    setComments([...comments, newComment]);
                    setCommentText("");
                }
            });
    };

    useEffect(() => {
        axios.get(url + `/posts/getpostbypostid/${id}`, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) { }
            else {
                setPost(response.data);
            }
        });

        axios.get(url + `/comments/getComments/${id}`, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) { }
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
                    <div className="card-body">
                        <h6 className="card-title text-primary mt-6" style={{ marginLeft: '5px' }}>@{post.username}</h6>
                        <h4 className="card-subtitle mt-3 " >{post.title}</h4>
                        <h5 className="mt-3">{post.postText}</h5>
                        {authState.username === post.username && (<button className="btn btn-danger btn-sm mt-2" onClick={() => deletePost(post.id)}><i className="fas fa-trash"></i></button>)}
                    </div>
                </div>
                <br></br>
                <input type="text" className="form-control" value={commentText} onChange={(event) => { setCommentText(event.target.value); }} placeholder="Add a comment..."></input><br></br>
                <button className=" btn btn-primary" onClick={addComment} disabled={commentText.length < 1}>Add Comment</button>
            </div>
            <div className="container">
                <br></br>

                {comments.length > 0 && <h2 className="mb-4" style={{ fontFamily: "'Patua One', cursive" }}>Comments</h2>}
                <div className="row">
                    {comments.reverse().map((value, key) => {
                        return (
                            <li key={key}>
                                <CommentCard username={value.username} postId={value.id} commentText={value.commentText} imageUrl={value.imageUrl}></CommentCard>
                            </li>
                        )
                    })}
                </div>
            </div>

        </div>
    )
}

export default PostAndComments
