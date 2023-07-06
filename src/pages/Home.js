import axios from "axios";
import React, { useState, useEffect } from "react";

const Home = () => {
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
            <h2 className="post-title">{blog.title}</h2>
            <p className="post-body">{blog.username}</p>
            <div class="text-center">
              <p className="post-body card-details">{blog.body}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
