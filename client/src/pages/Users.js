import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import Navbar from "./components/Navbar";
import { url } from "../helpers/BaseUrl";
function Users() {

  // const history = useHistory();

  // const routeChange = (id) => {
  //   let path = `/user/${id}`;
  //   history.push(path);
  // }
  //GET AllUsers
  const [listOfUsers, setListOfUsers] = useState([]);
  useEffect(() => {
    axios.get(url + "/auth", {
      headers: {
        accessToken: sessionStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data.error) { }
      else
        setListOfUsers(response.data);
    });
  }, []);

  const getUserLink = (id) => {
    return '/user/' + id;
  }
  return (
    <>
      <Navbar></Navbar><br></br>
      <div className="container">

        <div className="row">
          {listOfUsers.map((value, key) => {
            return (
              // <li key={key}>
                <div  key={key} className="col-md-4">
                  <UserCard username={value.username} name={value.name} postCount={value.postCount} userlink={getUserLink(value.id)}></UserCard>
                  <br></br>
                </div>
              // </li>
            )
          })}
        </div></div>
    </>
  );
}

export default Users;

