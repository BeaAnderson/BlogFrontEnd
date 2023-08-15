import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (config) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      let response = await axios.get("http://localhost:8088/api/v1/blogs");
      setBlogs(response.data);
    };
    fetchBlog();
  }, []);

  return (
    <div className="blogs-container">
      {blogs.map((blog) => {
        return (
          <div className="card post-card" key={blog.id}>
            <h2 className="post-title">
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h2>
            <p className="post-body">{blog.username}</p>
            <div>
              <p className="post-body card-details">
                {blog.body.substring(0, 10)}...
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
