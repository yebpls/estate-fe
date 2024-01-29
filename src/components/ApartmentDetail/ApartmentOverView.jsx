import React from "react";

export default function ApartmentOverView() {
  return (
    <div>
      <p className="text-md font-semibold my-5">
        Mua trực tiếp căn hộ thuộc khu đô thị Kita Gallery, Q. Bình Tân, TPHCM{" "}
      </p>
      <div className="flex">
        <div className=" flex flex-col w-28 h-28 bg-gray-200 rounded-lg mr-10">
          <p className="font-semibold mx-auto py-2 text-sm">Mức giá</p>
          <p className="font-semibold mx-auto py-1 text-red-500">500 Triệu</p>
          <p className="text-sm mx-auto py-1 text-red-500">(10 triệu/m2)</p>
        </div>
        <div className=" flex flex-col w-28 h-28 bg-gray-200 rounded-lg mr-10">
          <p className="font-semibold mt-auto mx-auto py-1 text-sm">
            Diện tích
          </p>
          <p className="font-semibold mb-auto mx-auto py-1 text-red-500">
            50 m2
          </p>
        </div>
        <div className=" flex flex-col w-28 h-28 bg-gray-200 rounded-lg mr-10">
          <p className="font-semibold mx-auto py-2 text-sm">Quy mô</p>
          <p className="text-sm mx-auto text-red-500">1 phòng bếp</p>
          <p className="text-sm mx-auto text-red-500">3 phòng nằm</p>
          <p className="text-sm mx-auto text-red-500">1 phòng sinh hoạt</p>
        </div>
      </div>
    </div>
  );
}
