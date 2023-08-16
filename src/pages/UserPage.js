import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useHistory, Link } from "react-router-dom";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token") 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      console.log(token)
      try {
        let response = await axios.get("http://localhost:8088/api/v1/users", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error)
      if (error.response.status === 401){
        navigate("/login", {state : {message: "Login needed to view this page"}})
      }
    }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <div className="posts-container">
        {users.map((user) => {
          return (
            <div className="card post-card" key={user.username}>
              <h2 className="post-title">{user.username}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPage;
