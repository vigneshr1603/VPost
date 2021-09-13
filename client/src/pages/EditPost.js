
import Navbar from './components/Navbar'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { url } from '../helpers/BaseUrl';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';
function EditPost() {
    const { postId } = useParams();
    const [postText, setPostText] = useState([]);
    const [title, setTitle] = useState([]);
    const [btndisabled, setDisabled] = useState(false);
    const history = useHistory();
    useEffect(() => {

        axios.get(url + `/posts/getpostbypostid/${postId}`, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (!response.data || response.data.error) { history.push("/"); }
            else {
                setPostText(response.data.postText);
                setTitle(response.data.title);
            }
        });
    }, []);

    const edit = () => {
        setDisabled(true);
        axios.post(url + `/posts/edit/${postId}`,
            {
                postText: postText,
                title: title,
            },
            {
                headers: {
                    accessToken: sessionStorage.getItem("accessToken"),
                },
            }).then((response) => {

                history.push("/post/" + postId);
            });
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="jumbotron vertical-center">
                <div className="container">
                    <h2 className="mt-2 pt-5" style={{ fontFamily: "'Patua One', cursive" }}>Edit Post</h2>

                    <div className="mt-4 card-panel-1 p-sm-5 position-relative">
                        <form>
                            <div className="form-group  position-relative">
                                <label htmlFor="title">Title</label>
                                <input value={title} type="text" id="title" placeholder="Title..." onChange={(event) => { setTitle(event.target.value) }} className="form-control mt-2" maxLength='50'></input>
                            </div>
                            <br></br>
                            <div className="form-group  position-relative">
                                <label htmlFor="description">Description</label>
                                <textarea value={postText} type="text" id="description" placeholder="Write something..." onChange={(event) => { setPostText(event.target.value) }} className="form-control mt-2" maxLength='200'></textarea>
                            </div>
                            <br></br>
                            <div className="form-group  position-relative">
                                <button className="btn btn-primary" type="button" onClick={() => edit()} disabled={(postText.length < 1 || title.length < 1 || btndisabled === true)}><i className="fa fa-pencil-alt" aria-hidden="true" ></i> Edit</button>
                            </div>
                        </form></div>
                </div>
            </div>
        </div>
    )
}

export default EditPost
