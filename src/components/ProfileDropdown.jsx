import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccId,
  setAgency,
  setCurrentUser,
  setCustomer,
  setInvestor,
  setIsLogin,
  setRole,
} from "../store/slices/accountSlice";
import storageService from "../config/storageService";

function ProfileDropdown() {
  const [isDropdown, setIsDropdown] = useState(false);
  const { role, currentUser } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const logout = () => {
    storageService.removeAccessToken();
    storageService.removeRole();
    dispatch(setRole(""));
    dispatch(setIsLogin(false));
    dispatch(setCurrentUser(null));
    dispatch(setAccId(null));
    dispatch(setAgency(null));
    dispatch(setInvestor(null));
    dispatch(setCustomer(null));
    navigate("/");

    return new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms (adjust as needed)
  };

  const onLogout = async () => {
    await logout();
    window.location.reload();
  };

  useEffect(() => {
    // dispatch(fetchUserProfile());
  }, []);

  return (
    <>
      <div
        onClick={handleDropdown}
        className="w-12 h-12 bg-transparent rounded-full relative cursor-pointer z-40 md:block hidden"
      >
        <img
          className="rounded-full w-full h-full"
          src={currentUser && currentUser.avatarUrl}
          alt="Avatar"
        />
        {isDropdown && (
          <div className="z-10 absolute -bottom-24 right-0  bg-white divide-y divide-gray-100 rounded-lg shadow w-28 ">
            <ul
              className="py-2 text-sm text-gray-700 flex flex-col justify-between"
              aria-labelledby="dropdownDefaultButton"
            >
              <li className="block text-center h-1/3 hover:text-blue-500">
                <Link className="block px-1 py-2" to={`/${role.toLowerCase()}`}>
                  Trang cá nhân
                </Link>
              </li>

              <li className="block h-1/3 px-1 py-2 hover:text-blue-500 ">
                <button onClick={onLogout} className="border-none w-full ">
                  Đăng xuất{" "}
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileDropdown;
