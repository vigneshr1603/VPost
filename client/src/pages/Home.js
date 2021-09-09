import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import axios from "axios";
import PostCard from './components/PostCard';
import { url } from '../helpers/BaseUrl';
function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    useEffect(() => {
        axios.get(url+"/posts/getallposts", {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) { }
            else {
                setListOfPosts(response.data.reverse());
            }
        });
    }, []);

    const getPostLink = (id) =>{
        return "/post/"+id
    }
    return (
        <div>
            <Navbar></Navbar>
            <br></br>
            <div className="container"><div className="row">
                {listOfPosts.map((value, key) => {
                    return (
                        <li className="col-md-4" key={value.id}>
                            <PostCard username={value.username} title={value.title} postText={value.postText} postLink={getPostLink(value.id)}></PostCard><br></br>
                        </li>
                    )
                })}
            </div></div>
        </div>
    )
}

export default Home
