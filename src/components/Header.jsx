import React from "react";
import { Link, useNavigate } from "react-router-dom";
import storageService from "../config/storageService";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setRole } from "../store/slices/accountSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  const { isLogin } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div className="bg-white py-4 px-14  flex justify-between shadow-box_shadow_1 w-full">
      <Link to="/" className="block w-14 h-14">
        <img className="w-full h-full" src="/images/logo.png" alt="" />
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
        {isLogin ? (
          // <div className="flex">
          //   <button
          //     onClick={() => onLogout()}
          //     className="px-2 border-none font-bold text-black hover:text-gray-400"
          //   >
          //     Đăng xuất
          //   </button>
          // </div>
          <ProfileDropdown />
        ) : (
          <>
            <div className="font-bold mx-2 text-text_color_base hover:text-black">
              <Link to="/login">Đăng nhập</Link>
            </div>
            <div className="font-bold mx-2 text-text_color_base hover:text-black">
              <Link to="/register">Đăng ký</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
