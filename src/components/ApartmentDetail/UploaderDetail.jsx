import React from "react";
import { Link } from "react-router-dom";

export default function UploaderDetail() {
  return (
    <div>
      <div className="w-48 h-80 m-5 block text-center bg-gray-100 rounded-md">
        <div className="p-3 w-24 h-24 mx-auto">
          <img
            className="mx-auto w-full h-full rounded-full"
            src={"./images/avatar.jpg"}
            alt="Description of your image"
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
