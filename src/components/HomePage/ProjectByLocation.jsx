import React from "react";
import { Link } from "react-router-dom";

export default function ProjectByLocation() {
  return (
    <div className="mb-10">
      <div className="font-bold text-xl mx-2 ml-40">
        <p>Dự án bất động sản theo địa điểm</p>
      </div>
      <div className="flex flex-wrap mx-40 items-center">
        <div className="w-1/2 px-1 pt-5 mb-5 h-80">
          <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
            <Link to="">
              <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                <h1 className="font-bold text-white text-2xl">
                  TP.Hồ Chí Minh
                </h1>
                <p className="text-white text-sm ">56.789 Bài Đăng</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-1/2 px-1 pt-5 mb-5 h-80">
          <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
            <Link to="">
              <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                <h1 className="font-bold text-white text-2xl">Hà Nội</h1>
                <p className="text-white text-sm ">56.789 Bài Đăng</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="bg-white w-1/4 px-1 pt-5 mb-5 h-48 rounded">
          <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
            <Link to="">
              <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                <h1 className="font-bold text-white text-2xl">Long An</h1>
                <p className="text-white text-sm ">56.789 Bài Đăng</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="bg-white w-1/4 px-1 pt-5 mb-5 h-48 rounded-md">
          <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
            <Link to="">
              <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                <h1 className="font-bold text-white text-2xl">Bình Dương</h1>
                <p className="text-white text-sm ">56.789 Bài Đăng</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="bg-white w-1/4 px-1 pt-5 mb-5 h-48 rounded">
          <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
            <Link to="">
              <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                <h1 className="font-bold text-white text-2xl">Bình Thuận</h1>
                <p className="text-white text-sm ">56.789 Bài Đăng</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="bg-white w-1/4 px-1 pt-5 mb-5 h-48 rounded-md">
          <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
            <Link to="">
              <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                <h1 className="font-bold text-white text-2xl">Đồng Nai</h1>
                <p className="text-white text-sm ">56.789 Bài Đăng</p>
              </div>
            </Link>
          </div>
        </div>
        <button className=" rounded-md border-2 border-black text-lg p-2 px-9 font-semibold ml-auto mr-auto hover:bg-slate-100 ">
          Xem thêm...
        </button>
      </div>
    </div>
  );
}
