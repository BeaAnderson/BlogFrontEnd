import axios from "axios";
import React, { useState, useEffect } from "react";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token") 

  useEffect(() => {
    const fetchUser = async () => {
      console.log(token)
      let response = await axios.get("http://localhost:8088/api/v1/users", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data);
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
