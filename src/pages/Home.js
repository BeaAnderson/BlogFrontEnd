import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (config) => {
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const [userLoggedIn, setUserLoggedIn] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      let response = await axios.get("http://localhost:8088/api/v1/blogs");
      setBlogs(response.data);
    };
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
    fetchBlog();
  }, []);

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:8088/api/v1/blogs/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setBlogs(
      blogs.filter((blog) => {
        return blog.id !== id;
      })
    );
  };

  if (userLoggedIn) {
    return (
      <div className="container">
        <h1>Blogs</h1>
        <div className="row">
          {blogs.map((blog) => {
            return (
              <div className="col-4">
                <div className="card mt-3 h-150" key={blog.id}>
                  <h2 className="post-title">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </h2>
                  <p className="post-body">{blog.username}</p>
                  <div>
                    <p className="post-body card-details">
                      {blog.body.substring(0, 30)}...
                    </p>
                  </div>
                  <div className="button">
                    <button
                      className="btn delete-btn"
                      onClick={() => deleteBlog(blog.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid">
        <h1>Blogs</h1>
        <div className="row">
          {blogs.map((blog) => {
            return (
              <div className="col-4">
                <div className="card mt-3 h-150" key={blog.id}>
                  <h2 className="post-title">
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </h2>
                  <p className="post-body">{blog.username}</p>
                  <div>
                    <p className="post-body card-details">
                      {blog.body.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Home;
