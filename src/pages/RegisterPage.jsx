import {
  faFont,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DatePicker, Select } from "antd";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { Controller, useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import schemaRegister from "../yup/schema/schemaRegister";
import accountApi from "../api/accountApi";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

function RegisterPage() {
  const { city } = useSelector((state) => state.buildingReducer);
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const cityOptions =
    city && city.map((c) => ({ label: c.cityName, value: c.id }));

  const form = useForm({
    resolver: yupResolver(schemaRegister),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = form;
  const onSubmit = async (data) => {
    console.log(data);
    const { confirmPassword, ...params } = data;
    console.log(params);

    try {
      const res = await accountApi.register(params);
      if (res) {
        console.log(res);
        emailjs
          .send(
            "service_jl7ysfd",
            "template_3wc70jo",
            {
              name: data.name,
              email: data.email,
            },
            "bwBGvMPUt9Tm4k-2a"
          )
          .then((response) => {
            console.log("Email successfully sent!", response);
            toast.success("Đăng ký thành công");
            navigate("/login");
          })
          .catch((error) => {
            console.error("Failed to send email", error);
            toast.error("Failed to send confirmation email");
          });
      }
    } catch (error) {
      toast.error("Email đã được sử dụng");
    }
    reset();
  };

  const disabledDate = (current) => {
    return current && current > dayjs().subtract(18, "year");
  };
  return (
    <div className="h-screen px-10 pt-10 pb-10 flex gap-8 font-inter">
      <div className="w-5/12 flex flex-col justify-between items-center">
        <Link to="/" className="block h-24 w-24">
          <img className="w-full h-full" src="/images/logo.png" alt="" />
        </Link>
        <div className="w-10/12 mt-28">
          <img className="w-full h-full" src="/images/city-img.png" alt="" />
        </div>
      </div>
      <div className="w-7/12 flex flex-col items-center">
        <h1 className="font-bold text-2xl uppercase mb-2">Đăng ký</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="text-left text-sm  text-red-500">
            {errors.email?.message}
          </div>
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
          <div className="text-left text-sm  text-red-500">
            {errors.password?.message}
          </div>
          <div className=" mb-4 w-full relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-1/2 -translate-y-1/2 left-4 text-gray_9"
            />
            <input
              className="w-full h-[50px] pl-10   rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
              type="password"
              placeholder="Mật khẩu"
              {...register("password", { required: true })}
            />
          </div>

          <div className="text-left text-sm text-red-500">
            {errors.confirmPassword?.message}
          </div>
          <div className=" mb-4 w-full relative">
            <FontAwesomeIcon
              icon={faLock}
              className="absolute top-1/2 -translate-y-1/2 left-4 text-gray_9"
            />
            <input
              className="w-full h-[50px] pl-10   rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
              type="password"
              placeholder="Nhập lại mật khẩu"
              {...register("confirmPassword", { required: true })}
            />
          </div>

          <div className="flex">
            <div className="w-1/2 mr-2">
              <div className="text-left text-sm text-red-500">
                {errors.name?.message}
              </div>
              <div className="mb-4 w-full relative">
                <FontAwesomeIcon
                  icon={faFont}
                  className="absolute top-1/2 -translate-y-1/2 left-4 text-gray_9"
                />
                <input
                  className="w-full h-[50px] pl-10   rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
                  type="text"
                  placeholder="Tên của bạn"
                  {...register("name", { required: true })}
                />
              </div>
            </div>
            <div className="w-1/2 ml-2">
              <div className="text-left text-sm text-red-500">
                {errors.phoneNumber?.message}
              </div>
              <div className="mb-4 w-full relative">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="absolute top-1/2 -translate-y-1/2 left-4 text-gray_9"
                />
                <input
                  className="w-full h-[50px] pl-10   rounded-[6px]  placeholder-gray_3  focus:placeholder-transparent focus:outline-none  focus:ring-1 ring-gray-400"
                  type="text"
                  placeholder="Số điện thoại"
                  {...register("phoneNumber", { required: true })}
                />
              </div>
            </div>
          </div>
          <div className="mb-4 flex">
            <div className="w-1/2">
              <div className="text-left text-sm  text-red-500">
                {errors.dob?.message}
              </div>
              <p className="text-lg font-bold">
                Ngày tháng năm sinh (phải lớn hơn 18 tuổi)
              </p>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    style={{ width: 300 }}
                    disabledDate={disabledDate}
                    placeholder="Chọn sinh nhật"
                    onChange={(date, dateString) => field.onChange(dateString)}
                    value={field.value ? dayjs(field.value) : null}
                  />
                )}
              />
            </div>

            <div className="w-1/2">
              <div className="text-left text-sm  text-red-500">
                {errors.gender?.message}
              </div>
              <p className="text-lg font-bold">Giới tính</p>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: 300 }}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Chọn giới tính "
                    options={[
                      {
                        value: 1,
                        label: "Nam",
                      },
                      {
                        value: 2,
                        label: "Nữ",
                      },
                      {
                        value: 0,
                        label: "Giới tính khác",
                      },
                    ]}
                  />
                )}
              />
            </div>
          </div>

          <div className="mb-4 flex">
            <div className="w-1/2">
              <div className="text-left text-sm  text-red-500">
                {errors.cityId?.message}
              </div>
              <p className="text-lg font-bold">Thành phố: </p>
              <Controller
                name="cityId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: 300 }}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Chọn thành phố bạn đang sống "
                    options={cityOptions}
                  />
                )}
              />
            </div>
            <div className="w-1/2">
              <div className="text-left text-sm  text-red-500">
                {errors.role?.message}
              </div>
              <p className="text-lg font-bold">Vai trò: </p>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: 300 }}
                    onChange={(value) => field.onChange(value)}
                    placeholder="Chọn vai trò "
                    options={[
                      {
                        value: "INVESTOR",
                        label: "Nhà đầu tư",
                      },
                      {
                        value: "AGENCY",
                        label: "Đại lý",
                      },
                      {
                        value: "CUSTOMER",
                        label: "Khách hàng",
                      },
                    ]}
                  />
                )}
              />
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full py-3  text-text_color_base hover:text-text_color_2 font-bold"
            >
              Đăng ký
            </button>
          </div>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-600">
              <span>Bạn đã có tài khoản ? </span>
              <Link to="/login" className="hover:text-gray-600 text-sky-500">
                {" "}
                Đăng nhập
              </Link>
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
        </form>
        {/* <DevTool control={control} /> */}
      </div>
    </div>
  );
}

export default RegisterPage;
