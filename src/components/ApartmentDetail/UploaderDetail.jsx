import React from "react";
import { Link } from "react-router-dom";

export default function UploaderDetail() {
  return (
    <div>
      <div className="w-48 h-72 m-5 block text-center bg-orange-300">
        <div className="p-3 pt-5">
          <img
            className="mx-auto"
            src={"../public/images/hochiminh.jpg"}
            alt="Description of your image"
            style={{ width: 43, height: 40 }}
          />
        </div>
        <p className="font-semibold text-sm p-1">Được đăng bởi</p>
        <p className="text-lg">investor name</p>
        <button className="bg-red-500 text-white rounded-md p-1 m-1 px-2 font-semibold border-none">
          Hiện số điện thoại
        </button>
        <Link to="" className="p-1 px-2 font-semibold">
          Gửi qua email
        </Link>
        <Link to="" className="p-1 px-2 font-semibold">
          Liên hệ qua Zalo
        </Link>
        <Link to="" className="p-1 px-2 font-semibold">
          Gọi điện thoại
        </Link>
      </div>
    </div>
  );
}
