import React from "react";
import { Link } from "react-router-dom";

export default function Tool() {
  return (
    <div className="bg-slate-100 rounded-md w-60 flex flex-col mx-auto p-4 my-3">
      <p className="font-semibold text-sm px-auto p-1">
        Bán căn hộ, chung cư liền kề ở quận Bình Tân (TP.HCM)
      </p>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Tư vấn phong thủy
      </Link>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Dự tính chi phí làm nhà
      </Link>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Tính lãi suất
      </Link>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Quy trình làm nhà
      </Link>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Quy trình làm nhà
      </Link>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Xem tuổi làm nhà
      </Link>
    </div>
  );
}
