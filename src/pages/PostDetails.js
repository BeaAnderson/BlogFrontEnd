import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function PostDetails(props) {
  const [blogs, setBlogs] = useState([]);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const token = localStorage.getItem("token");
  const [userObject, setUserObject] = useState([]) 
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
          <span style={{fontWeight:"bold"}}>{comment.username}</span>
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

  const addComment = async (body) => {
    const localUser = JSON.parse(atob(token.split(".")[1]));
    console.log(localUser)
    let response = await axios.post(
      "http://localhost:8088/api/v1/comments",
      {
        body: body,
        blog: {
          id: id,
        },
        user: {
          userId: localUser.sub,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(body);
    navigate(`/blogs/${id}`);
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <img src={blogs.image}></img>
      </div>
      <div className="container-fluid" style={{marginTop:20, paddingLeft:40, paddingRight:60}}>
        <div className="post-card" key={blogs.id}>
          <h2 className="post-title">{blogs.title}</h2>
          <p>authored by: {blogs.username}</p>
          <div style={{ whiteSpace: "pre-line" }}>
            <p className="post-body" style={{marginBottom:30}}>{blogs.body}</p>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{paddingLeft:40, paddingRight:60}}>
        <h3 className="post-title">Comments</h3>
        <hr></hr>
        <form className="addCommentForm" onSubmit={handleSubmit}>
          <label>Add a comment:</label>
          <br></br>
          <textarea
            type="text"
            id="body"
            value={body}
            name="commentBody"
            rows="2"
            cols="100"
            onChange={(e) => setBody(e.target.value)}
          />
          <input type="submit" value="submit" />
        </form>
        <br />
        
        {displayComments()}
      </div>
    </>
  );
}

export default PostDetails;
