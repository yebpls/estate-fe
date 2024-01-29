import React from "react";
import { Link } from "react-router-dom";

export default function BrokerInfo() {
  return (
    <div className="bg-slate-100 rounded-md w-60 flex flex-col mx-auto p-4  my-3">
      <p className="font-semibold text-sm px-auto p-1">Nhà môi giới</p>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Công ty TNHH Kita Gallery Việt Nam
      </Link>
    </div>
  );
}
