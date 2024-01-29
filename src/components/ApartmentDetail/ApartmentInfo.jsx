import React from "react";

export default function ApartmentInfo() {
  return (
    <div className="flex flex-col">
      <p className="text-red-500 font-semibold text-xl mx-auto m-2">
        Thông tin bất động sản
      </p>
      <div className="flex mx-auto">
        <div className="w-80 h-80 rounded-md bg-gray-200  m-5 p-4 flex flex-wrap">
          <div className="w-32 h-32 bg-gray-100  mt-2 mx-auto ml-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 text-lg">Mức giá</p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              500 Triệu
            </p>
            <p className="text-sm mx-auto py-1 text-red-500">(10 triệu/m2)</p>
          </div>
          <div className="w-32 h-32 bg-gray-100  mt-2 mx-auto mr-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 pt-5 text-lg">Diện tích</p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              50 m2
            </p>
          </div>
          <div className="w-32 h-32 bg-gray-100  mb-2 mx-auto ml-3 flex flex-col">
            <p className="font-semibold mx-auto py-1 text-lg">Quy mô</p>

            <p className="text-sm mx-auto py-1 text-red-500">1 phòng bếp</p>
            <p className="text-sm mx-auto py-1 text-red-500">3 phòng nằm</p>
            <p className="text-sm mx-auto py-1 text-red-500">
              1 phòng sinh hoạt
            </p>
          </div>
          <div className="w-32 h-32 bg-gray-100   mb-2 mx-auto mr-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 pt-5 text-lg">Pháp lý</p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              Đầy đủ
            </p>
          </div>
        </div>
        <div className="w-80 h-80 rounded-md bg-gray-200  m-5 p-4 flex flex-wrap">
          <div className="w-32 h-32 bg-gray-100  mt-2 mx-auto ml-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 pt-5 text-lg">Nội thất</p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              Cơ bản
            </p>
          </div>
          <div className="w-32 h-32 bg-gray-100  mt-2 mx-auto mr-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 pt-5 text-lg">Hướng nhà</p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              Tây Nam
            </p>
          </div>
          <div className="w-32 h-32 bg-gray-100  mb-2 mx-auto ml-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 pt-5 text-lg">Số toilet</p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              2
            </p>
          </div>
          <div className="w-32 h-32 bg-gray-100   mb-2 mx-auto mr-3 flex flex-col">
            <p className="font-semibold mx-auto py-2 pt-5 text-sm">
              Hướng ban công
            </p>
            <p className="font-semibold text-2xl mx-auto py-1 text-red-500">
              Đông Bắc
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
