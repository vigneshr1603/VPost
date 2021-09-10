import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import axios from "axios";
import PostCard from './components/PostCard';
import { url } from '../helpers/BaseUrl';
import notfound from '../assets/home_notfound.svg'
function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [showImage,setShowImage]=useState(1);
    useEffect(() => {
        axios.get(url + "/posts/getallposts", {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) { setShowImage(0) }
            else {
                setListOfPosts(response.data.reverse());
                if(response.data.length===0)
                setShowImage(0)
                
            }
        });
    }, []);

    const getPostLink = (id) => {
        return "/post/" + id
    }
    return (
        <div>
            <Navbar></Navbar>
            <br></br>
            <div className="container"><div className="row">
                {listOfPosts.length > 0 && <h2 className="mb-4" style={{ fontFamily: "'Patua One', cursive" }}>Recent posts</h2>}
                {listOfPosts.map((value, key) => {
                    return (
                        <li className="col-md-4" key={value.id}>
                            <PostCard username={value.username} title={value.title} postText={value.postText} postLink={getPostLink(value.id)}></PostCard><br></br>
                        </li>
                    )
                })}
                 {showImage===0 && <div className="mt-4 text-center" ><img  style={{width:'55%'}} src={notfound} alt=""></img><h2 className="mt-4" style={{ fontFamily: "'Patua One', cursive" }}>No Posts found</h2></div>}
            </div>
            </div>
        </div>
    )
}

export default Home
