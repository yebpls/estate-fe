import React from "react";
import { Link } from "react-router-dom";

export default function RelatedApartment() {
  return (
    <div className="bg-slate-100 rounded-md w-60 flex flex-col mx-auto p-4  my-3">
      <p className="font-semibold text-sm px-auto p-1">
        Bán căn hộ, chung cư liền kề ở quận Bình Tân (TP.HCM)
      </p>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Akari City Võ Văn Kiệt (15)
      </Link>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Khu đô thị mới 5 sao (100)
      </Link>
      <Link to="" className="text-sm px-auto p-1 hover:text-gray-400">
        Mega World City (556)
      </Link>
    </div>
  );
}
