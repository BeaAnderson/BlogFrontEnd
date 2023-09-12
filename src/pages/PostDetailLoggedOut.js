import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function PostDetailsLoggedOut(props) {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const navigate = useNavigate();

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

  const displayComments = () => {
    if (blogs.comments) {
      return blogs.comments.map((comment, index) => (
        <div key={index}>
          {comment.username}
          <br></br>
          {comment.body}
        </div>
      ));
    } else if (!comments.length) {
      setComments(blogs.comments);
      return <div></div>;
    } else {
      return null;
    }
  };

  while (!blogs.comments) {
    return <div>waiting</div>;
  }

  return (
    <>
      <div className="posts-container card">
        <div className="post-card" key={blogs.id}>
          <h2 className="post-title">{blogs.title}</h2>
          <p>authored by: {blogs.username}</p>
          <div style={{ whiteSpace: "pre-line" }}>
            <p className="post-body">{blogs.body}</p>
          </div>
        </div>
      </div>
      <div className="post-card">
        <h2 className="post-title">Comments</h2>
        <div>log in to post a comment</div>
        <br />
        {displayComments()}
      </div>
    </>
  );
}

export default PostDetailsLoggedOut;
