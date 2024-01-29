import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ApartmentOverView({ apartment }) {
  const formattedNumber = apartment?.price / 1000000000;

  return (
    <div>
      <p className="text-md font-semibold my-5">
        Mua trực tiếp căn hộ thuộc khu đô thị {apartment?.projectName},{" "}
        {apartment?.cityName}
      </p>
      <div className="flex">
        <div className=" flex flex-col w-28 h-28 bg-gray-200 rounded-lg mr-10">
          <p className="font-semibold mx-auto py-2 text-sm">Mức giá</p>
          <p className="font-semibold mx-auto py-1 text-red-500">
            {formattedNumber} Tỷ
          </p>
          <p className="text-sm mx-auto py-1 text-red-500">(10 triệu/m2)</p>
        </div>
        <div className=" flex flex-col w-28 h-28 bg-gray-200 rounded-lg mr-10">
          <p className="font-semibold mt-auto mx-auto py-1 text-sm">
            Diện tích
          </p>
          <p className="font-semibold mb-auto mx-auto py-1 text-red-500">
            {apartment?.area} m2
          </p>
        </div>
        <div className=" flex flex-col w-28 h-28 bg-gray-200 rounded-lg mr-10">
          <p className="font-semibold mx-auto py-2 text-sm">Quy mô</p>
          <p className="text-sm mx-auto text-red-500">
            {apartment?.kitchen} phòng bếp
          </p>
          <p className="text-sm mx-auto text-red-500">
            {apartment?.bedRoom} phòng nằm
          </p>
          <p className="text-sm mx-auto text-red-500">
            {apartment?.livingRoom} phòng sinh hoạt
          </p>
        </div>
      </div>
    </div>
  );
}
