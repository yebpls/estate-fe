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
    <div className="bg-white py-4 px-14  flex justify-between shadow-box_shadow_1 fixed w-full">
      <Link to="" className="block w-14 h-14">
        <img className="w-full h-full" src="images/logo.png" alt="" />
      </Link>
      <div className="flex items-center">
        <div className="font-bold mx-2 text-text_color_base hover:text-black">
          <Link to="">Chung cư bán</Link>
        </div>
        <div className="font-bold mx-2 text-text_color_base hover:text-black">
          <Link to="">Dự án</Link>
        </div>
        <div className="font-bold mx-2 text-text_color_base hover:text-black">
          <Link to="">Tin tức</Link>
        </div>
      </div>
      <div className="flex items-center">
        <div className="font-bold mx-2 text-text_color_base hover:text-black">
          <Link to="">Đăng nhập</Link>
        </div>
        <div className="font-bold mx-2 text-text_color_base hover:text-black">
          <Link to="">Đăng ký</Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
