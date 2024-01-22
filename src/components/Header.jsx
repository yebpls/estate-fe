import React from "react";
import { Link, useNavigate } from "react-router-dom";
import storageService from "../config/storageService";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    storageService.removeAccessToken();
    // dispatch(setIsLogin(false));
    // dispatch(setRole(""));
    storageService.removeRole();

    navigate("/");
    window.location.reload();
  };
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <div>
        <button onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
}

export default Header;
