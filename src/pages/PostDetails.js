import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function PostDetails(props) {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        let response = await axios.get(
          `http://localhost:8088/api/v1/blogs/${id}`
        );
        setBlogs(response.data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    };
    fetchBlog();
  }, []);

  return (
    <div className="posts-container card">
      <div className="post-card" key={blogs.id}>
        <h2 className="post-title">{blogs.title}</h2>
        <p>authored by: {blogs.username}</p>
        <p className="post-body">{blogs.body}</p>
      </div>
    </div>
  );
}

export default PostDetails;
