import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostCard from './components/PostCard';
import { url } from '../helpers/BaseUrl';
import notfound from '../assets/home_notfound.svg';
function UserPosts() {
    
    let { id } = useParams();
    const [listOfPosts, setListOfPosts] = useState([]);
    const [showImage,setShowImage]=useState(1);
    useEffect(() => {
        axios.get(url+`/posts/getpostsbyid/${id}`, {
            headers: {
                accessToken: sessionStorage.getItem("accessToken"),
            }
        }).then((response) => {
            if (response.data.error) { setShowImage(0);}
            else {
                setListOfPosts(response.data.reverse());
                if(response.data.length===0)  setShowImage(0);
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
            {listOfPosts.length>0 && <h2 className="mb-4" style={{fontFamily:"'Patua One', cursive"}}>Posts by {listOfPosts[0].username}</h2>}
                <div className="row">
                {listOfPosts.map((value, key) => {
                    return (
                        <div className="col-md-4" key={key}>
                            <PostCard  username={value.username} title={value.title} postText={value.postText} imageUrl={value.imageUrl} postLink={getPostLink(value.id)}></PostCard><br></br>
                            
                        </div>
                    )
                })}
            </div>
            {(showImage===0 ) && <div className="mt-4 text-center" ><img  style={{width:'55%'}} src={notfound} alt=""></img><h2 className="mt-4" style={{ fontFamily: "'Patua One', cursive" }}>No Posts found</h2></div>}
            </div>
        </div>
    )
}

export default UserPosts
