import React, { useState, useEffect } from "react";
import { useNavigate, useHistory, Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = "http://localhost:8088/auth/register";

  const navigate = useNavigate();

  const Register = async (username, password) => {
    try {
      const response = await axios.post(location, {
        username: username,
        password: password,
      });

      const user = response.data;
      localStorage.setItem("token", user.jwt);

      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Register(username, password);
  };

  return (
    <div className="add-post-container">
      <form className="addUserForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      </div>
  );
}

export default RegisterPage;