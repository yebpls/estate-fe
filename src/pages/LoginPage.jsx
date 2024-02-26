import React from "react";
import { useForm } from "react-hook-form";
import accountApi from "../api/accountApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { DevTool } from "@hookform/devtools";
import { jwtDecode } from "jwt-decode";
import storageService from "../config/storageService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAgencyId,
  getInvestorId,
  setAccId,
  setIsLogin,
  setRole,
} from "../store/slices/accountSlice";
import { toast } from "react-toastify";

function LoginPage() {
  const dispatch = useDispatch();
  const { role, id } = useSelector((state) => state.accountReducer);
  const form = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await accountApi.login(data);
      if (res) {
        console.log(res);
        let unDecodeToken = res.data.data;
        storageService.setAccessToken(unDecodeToken);
        const token = jwtDecode(unDecodeToken);
        console.log(token);
        // loginSuccessNotify();
        dispatch(setIsLogin(true));
        dispatch(setRole(token.role));
        dispatch(setAccId(token.sub));

        storageService.setRole(token.role);
        if (role === "INVESTOR") {
          dispatch(getInvestorId(id));
          // navigate("/investor");
        }
        if (role === "AGENCY") {
          dispatch(getAgencyId(id));
          // navigate("/agency");
        }
        if (role === "CUSTOMER") {
          navigate("/customer");
        }
        //else if (role === "Admin") {
        //   navigate("/admin");
        // } else {
        navigate("/");
        // }
      }
    } catch (error) {
      // setMessage(error.response.data._message);
      // loginFailNotify();
      toast.error("Sai email hoặc mật khẩu");
    }
    reset();
  };
  return (
    <div className="h-screen px-16 pt-20 pb-14 flex gap-8 font-inter">
      <div className="w-5/12 flex flex-col justify-between items-center">
        <Link to="/" className="block h-24 w-24">
          <img className="w-full h-full" src="/images/logo.png" alt="" />
        </Link>
        <div className="w-10/12 mt-10">
          <img className="w-full h-full" src="/images/city-img.png" alt="" />
        </div>
      </div>
      <div className="w-7/12 flex flex-col items-center">
        <h1 className="font-bold text-4xl uppercase mb-10">Đăng nhập</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full my-5">
          <div className="mb-4 w-full relative">
            <FontAwesomeIcon
              icon={faUser}
              className="absolute top-1/2 -translate-y-1/2 left-4 text-gray_9"
            />
            <input
              className="w-full h-[50px] pl-10   rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          <div className=" mb-4 w-full relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-1/2 -translate-y-1/2 left-4 text-gray_9"
            />
            <input
              className="w-full h-[50px] pl-10   rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="w-1/2 py-3 !bg-blue_1 hover:!bg-white text-white hover:text-blue_1 hover:border-blue_1 font-bold"
              type="submit"
            >
              Đăng nhập
            </button>
            <button className="w-1/2 py-3 text-text_color_base hover:text-text_color_2 font-bold">
              Quên mật khẩu?
            </button>
          </div>
          <div className="relative flex py-5 my-8 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-600">
              <span>Bạn chưa có tài khoản ? </span>
              <Link to="/register" className="hover:text-gray-600 text-sky-500">
                {" "}
                Đăng ký
              </Link>
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="w-full">
            <button className="w-full py-3  text-text_color_base hover:text-text_color_2 font-bold">
              Đăng nhập bằng Google
            </button>
          </div>
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
}

export default LoginPage;
