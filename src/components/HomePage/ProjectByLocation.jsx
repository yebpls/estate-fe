import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ProjectByLocation() {
  const { city } = useSelector((state) => state.buildingReducer);
  return (
    <>
      {city && (
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
                      {city[0].cityName}
                    </h1>
                    {/* <p className="text-white text-sm ">56.789 Bài Đăng</p> */}
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-1/2 px-1 pt-5 mb-5 h-80">
              <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
                <Link to="">
                  <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                    <h1 className="font-bold text-white text-2xl">
                      {city[1].cityName}
                    </h1>
                    {/* <p className="text-white text-sm ">56.789 Bài Đăng</p> */}
                  </div>
                </Link>
              </div>
            </div>
            <div className="bg-white w-1/4 px-1 pt-5 mb-5 h-48 rounded">
              <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
                <Link to="">
                  <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                    <h1 className="font-bold text-white text-2xl">
                      {city[2].cityName}
                    </h1>
                    {/* <p className="text-white text-sm ">56.789 Bài Đăng</p> */}
                  </div>
                </Link>
              </div>
            </div>
            <div className="bg-white w-1/4 px-1 pt-5 mb-5 h-48 rounded-md">
              <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
                <Link to="">
                  <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                    <h1 className="font-bold text-white text-2xl">
                      {city[3].cityName}
                    </h1>
                    {/* <p className="text-white text-sm ">56.789 Bài Đăng</p> */}
                  </div>
                </Link>
              </div>
            </div>
            <div className="bg-white w-1/4 px-1 pt-5 mb-5 h-48 rounded">
              <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
                <Link to="">
                  <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                    <h1 className="font-bold text-white text-2xl">
                      {city[4].cityName}
                    </h1>
                    {/* <p className="text-white text-sm ">56.789 Bài Đăng</p> */}
                  </div>
                </Link>
              </div>
            </div>
            <div className="bg-white w-1/4 px-1 pt-5 mb-5 h-48 rounded-md">
              <div className=" bg-[url('../public/images/hochiminh.jpg')] w-full h-full flex justify-center items-center rounded-md">
                <Link to="">
                  <div className="w-full bg-gray-400/50 hover:bg-gray-400/75">
                    <h1 className="font-bold text-white text-2xl">
                      {city[5].cityName}
                    </h1>
                    {/* <p className="text-white text-sm ">56.789 Bài Đăng</p> */}
                  </div>
                </Link>
              </div>
            </div>
            <button className=" rounded-md border-2 border-black text-lg p-2 px-9 font-semibold ml-auto mr-auto hover:bg-slate-100 ">
              Xem thêm...
            </button>
          </div>
        </div>
      )}
    </>
  );
}
