import "./App.css";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import UserPosts from "./pages/UserPosts";
import PageNotFound from "./pages/PageNotFound";
import PostAndComments from "./pages/PostAndComments";
import { Redirect } from "react-router";
import Settings from "./pages/Settings";
import { useState,useEffect } from "react";
import axios from "axios";
import {AuthContext} from "./helpers/AuthContext";
import { url } from "./helpers/BaseUrl";
import EditPost from "./pages/EditPost";
function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(url+"/auth/auth", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Switch>
          <Route path="/login" exact component={Login}></Route>  
          <Route path="/signup" exact component={SignUp}></Route>  
          <Route path="/users" exact component={Users}></Route>  
          <Route path="/home" exact component={Home}></Route> 
          <Route path="/addpost" exact component={AddPost}></Route> 
          <Route path="/user/:id" exact component={UserPosts}></Route>
          <Route path="/post/:id" exact component={PostAndComments}></Route>
          <Route path='/settings' exact component={Settings}></Route>
          <Route path="/edit/:postId" exact component={EditPost}></Route>
          <Redirect path="" to="/login"></Redirect>
          <Route component={PageNotFound}></Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
    
  );
}

export default App;
