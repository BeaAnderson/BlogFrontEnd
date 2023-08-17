import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostDetails from "./pages/PostDetails";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import RegisterPage from "./pages/RegisterPage";
import AccessDenied from "./pages/AccessDenied";
import CreateBlogPage from "./pages/CreateBlogPage";
import HeaderLoggedOut from "./components/HeaderLoggedOut";
import HeaderAuthentication from "./components/HeaderAuth";

function App() {
  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  

  return (
    <Router>
      <div>
        <HeaderAuthentication />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<PostDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/users" element={<UserPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/accessdenied" element={<AccessDenied />} />
          <Route path="/createblog" element={<CreateBlogPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
