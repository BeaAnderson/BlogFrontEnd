import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useHistory, Link } from "react-router-dom";
import PostDetails from "../pages/PostDetails";
import PostDetailsLoggedOut from "../pages/PostDetailLoggedOut";

const PostDetailAuthentication = () => {
  const [userLoggedIn, setUserLoggedIn] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        console.log("making request")
        let response = await axios.get("http://localhost:8088/api/v1/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log();
        setUserLoggedIn(true);
      } catch (error) {

        if (error.response.status === 401) {
          console.log("401 console print out")
          setUserLoggedIn(false);
        }
      }
    };
    verifyUser();
  }, []);

  while(userLoggedIn===""){
    return (<div>wait</div>)
  }

  if (userLoggedIn) {
    console.log(userLoggedIn)
    return <PostDetails />;
  } else {
    return <PostDetailsLoggedOut />;
  }
};

export default PostDetailAuthentication;
