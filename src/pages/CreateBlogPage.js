import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userLoggedIn, setUserLoggedIn] = useState([]);
  const userObject = JSON.parse(atob(token.split(".")[1]));

  useEffect(() => {
    const verifyUser = async () => {
      try {
        let response = await axios.get("http://localhost:8088/api/v1/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserLoggedIn(true);
      } catch (error) {
        if (error.response.status === 401) {
          setUserLoggedIn(false);
        }
      }
    };
    verifyUser();
  }, []);

  const addBlogs = async (user, title, body) => {
    let response = await axios.post(
      "http://localhost:8088/api/v1/blogs",
      {
        user: { userId: userObject.sub },
        title: title,
        body: body,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBlogs((blogs) => [response.data, ...blogs]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBlogs(user, title, body);
    navigate("/");
  };

  if (userLoggedIn) {
    return (
      <div>
        <h1>Create blog</h1>
        <form className="addBlogForm" onSubmit={handleSubmit}>
          <label>User Id:</label>
          <br />
          <input
            type="text"
            id="user"
            value={user}
            name="userId"
            onChange={(e) => setUser(e.target.value)}
          />
          <br />
          <label>Title:</label>
          <br />
          <input
            type="text"
            id="title"
            value={title}
            name="blogTitle"
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label>Body:</label>
          <br />
          <textarea
            type="text"
            id="body"
            value={body}
            name="blogBody"
            rows="10"
            cols="100"
            onChange={(e) => setBody(e.target.value)}
          />
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  } else {
    navigate("/accessdenied");
  }
};

export default CreateBlogPage;
