import React from "react";
import { useForm } from "react-hook-form";
import accountApi from "../api/accountApi";

function LoginPage() {
  const form = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = async (data) => {
    try {
      const res = await accountApi.login(data);
      if (res) {
        console.log(res);
        // let unDecodeToken = res.data._data.accessToken;
        // storageService.setAccessToken(unDecodeToken);
        // const token = jwtDecode(unDecodeToken);
        // loginSuccessNotify();
        // dispatch(setIsLogin(true));
        // dispatch(setRole(token[roleToken]));
        // storageService.setRole(token[roleToken]);
        // if (role === "Instructor") {
        //   navigate("/instructor");
        // } else if (role === "Admin") {
        //   navigate("/admin");
        // } else {
        //   navigate("/");
        // }
      }
    } catch (error) {
      // setMessage(error.response.data._message);
      // loginFailNotify();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" mb-2">
          <input
            className="w-[400px] h-[50px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
            type="text"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </div>
        <div className=" mb-2">
          <input
            className="w-[400px] h-[50px] bg-gray_6 pl-10 pr-3 py-2  rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
