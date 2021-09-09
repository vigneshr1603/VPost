import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import { url } from '../helpers/BaseUrl';
function UserPosts() {
    
    let { id } = useParams();
    const [listOfPosts, setListOfPosts] = useState([]);
    useEffect(() => {
        axios.get(url+`/posts/getpostsbyid/${id}`, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) { }
            else {
                setListOfPosts(response.data.reverse());
            }
        });
    });
    const getPostLink = (id) =>{
        return "/post/"+id
    }
    return (
        <div>
            <Navbar></Navbar> 
            <br></br>
            <div className="container">
                <div className="row">
                {listOfPosts.map((value, key) => {
                    return (
                        <div className="col-md-4">
                            <PostCard  username={value.username} title={value.title} postText={value.postText} imageUrl={value.imageUrl} postLink={getPostLink(value.id)}></PostCard><br></br>
                        </div>
                    )
                })}
            </div></div>
        </div>
    )
}

export default UserPosts
