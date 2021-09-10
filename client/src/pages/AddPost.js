import axios from 'axios';
import React, { useState } from 'react'
import Navbar from '../pages/components/Navbar'
import { url } from '../helpers/BaseUrl';
function AddPost(props) {
    const [postText, setPostText] = useState([]);
    const [title, setTitle] = useState([]);
    const CreatePost = () => {
        if (postText === "" || title === "") { }
        else {
            axios.post(url + "/posts/addpost", { postText: postText, title: title }, { headers: { accessToken: sessionStorage.getItem("accessToken") } }).then((response) => {
                props.history.push("/home");
            })
        }
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="jumbotron vertical-center">
                <div className="container">
                    <div className="card-panel-1 p-sm-5 position-relative">
                        <form>
                            <div className="form-group  position-relative">
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" placeholder="Title..." onChange={(event) => { setTitle(event.target.value) }} className="form-control"></input>
                            </div>
                            <br></br>
                            <div className="form-group  position-relative">
                                <label htmlFor="description">Description</label>
                                <textarea type="text" id="description" placeholder="Write something..." onChange={(event) => { setPostText(event.target.value) }} className="form-control"></textarea>
                            </div>
                            <br></br>
                            <div className="form-group  position-relative">
                                <button onClick={CreatePost} className="btn btn-primary" type="button"><i className="fa fa-cloud" aria-hidden="true"></i> Add Post</button>
                            </div>
                        </form></div>
                </div>
            </div>
        </div>
    )
}

export default AddPost;
