import React from "react";

export default function ApartmentInfo() {
  return (
    <div>
      <p>Thông tin bất động sản</p>
      <div className="flex">
        <div className="w-80 h-80 rounded-md bg-red-300 m-5 p-4 flex flex-wrap">
          <div className="w-32 h-32 bg-gray-300 mt-2 mx-auto ml-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 text-lg">Mức giá</p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              500 Triệu
            </p>
            <p className="text-sm mx-auto py-1 text-red-500">(10 triệu/m2)</p>
          </div>
          <div className="w-32 h-32 bg-gray-300 mt-2 mx-auto mr-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 pt-5 text-lg">Diện tích</p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              50 m2
            </p>
          </div>
          <div className="w-32 h-32 bg-gray-300 mb-2 mx-auto ml-3 flex flex-col">
            <p className="font-semibold mx-auto py-1 text-lg">Quy mô</p>

            <p className="text-sm mx-auto py-1 text-red-500">1 phòng bếp</p>
            <p className="text-sm mx-auto py-1 text-red-500">3 phòng nằm</p>
            <p className="text-sm mx-auto py-1 text-red-500">
              1 phòng sinh hoạt
            </p>
          </div>
          <div className="w-32 h-32 bg-gray-300  mb-2 mx-auto mr-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 pt-5 text-lg">Pháp lý</p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              Đầy đủ
            </p>
          </div>
        </div>
        <div className="w-64 h-64 rounded-md bg-red-300 m-5"></div>
      </div>
    </div>
  );
}
