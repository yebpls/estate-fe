import React from "react";
import { Link, useNavigate } from "react-router-dom";
import storageService from "../config/storageService";

function HomePage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    storageService.removeAccessToken();
    // dispatch(setIsLogin(false));
    // dispatch(setRole(""));
    storageService.removeRole();

    navigate("/");
    window.location.reload();
  };
  return <div></div>;
}

export default HomePage;
