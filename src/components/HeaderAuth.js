import HeaderVerified from "./HeaderVerified";
import HeaderLoggedOut from "./HeaderLoggedOut";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useHistory, Link } from "react-router-dom";

const HeaderAuthentication = () => {
    const [userLoggedIn, setUserLoggedIn] = useState([]);
    const token = localStorage.getItem("token") 
    
    useEffect(()=>{
        const verifyUser = async () => {
            try {
                let response = await axios.get("http://localhost:8088/api/v1/verify",{
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  }
                );
                console.log(JSON.parse(atob("eyJpc3MiOiJzZWxmIiwic3ViIjoiYmVlIiwiaWF0IjoxNjkzNDExNTQ0LCJyb2xlcyI6IlVTRVIifQ")));
                setUserLoggedIn(true);
            } catch (error) {
                if (error.response.status === 401){
                    setUserLoggedIn(false);
                }
            }
        };
        verifyUser();
    }, []);
  
    if (userLoggedIn) {
      return <HeaderVerified/>
    } else {
      return <HeaderLoggedOut />;
    }
};
  
  export default HeaderAuthentication;
  