import axios from 'axios';
import React, { useState } from 'react'
import Navbar from '../pages/components/Navbar'
import { url } from '../helpers/BaseUrl';
import Swal from 'sweetalert2';
function AddPost(props) {
    const [postText, setPostText] = useState([]);
    const [title, setTitle] = useState([]);
    const [btndisabled , setDisabled] = useState(false);
    const CreatePost = () => {
        setDisabled(true);
        if (postText === "" || title === "") {  }
        else {
            axios.post(url + "/posts/addpost", { postText: postText, title: title }, { headers: { accessToken: sessionStorage.getItem("accessToken") } }).then((response) => {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    html:
                        'Post has been added!',
                    showCloseButton: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    focusConfirm: false,
                    timer: 1000
                })
                props.history.push("/home");
            })
        }
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="jumbotron vertical-center">
                <div className="container">
                <h2 className="mt-2 pt-5" style={{fontFamily:"'Patua One', cursive"}}>Add post</h2>
           
                    <div className="mt-4 card-panel-1 p-sm-5 position-relative">
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
                                <button onClick={CreatePost} className="btn btn-primary" type="button" disabled={(postText.length<1 || title.length<1 || btndisabled===true)}><i className="fa fa-cloud-upload-alt" aria-hidden="true" ></i> Add Post</button>
                            </div>
                        </form></div>
                </div>
            </div>
        </div>
    )
}

export default AddPost;
