import { Col, Row } from "antd";
import React from "react";

export default function ProjectDescription({ apartment }) {
  const formattedNumber = apartment?.price.toLocaleString("de-DE");

  return (
    <div className="w-full bg-gray-100 rounded-md p-3 my-5 flex-col">
      <p className="text-red-500 font-semibold text-2xl text-center mb-4">
        Thông tin mô tả
      </p>
      {/* <p className="text-sm p-1">
        Chủ đầu tư Kita Gallery luôn luôn hướng đến mục tiêu tốt nhất cho khách
        hàng về các căn hộ cao cấp, sang trọng ở đường Võ Văn Kiệt, Q. Bình Tân
        (TP.HCM) với nhiều ưu đãi hấp dẫn, hỗ trợ sổ đỏ...
      </p>
      <p className="font-semibold p-1">
        Giá gốc các căn hộ của chủ đầu tư Kita Gallery
      </p>
      <p className="text-sm p-1">
        Căn 1 phòng ngủ: 10 triệu/m2 (khoảng 30m2 - 300 triệu)
      </p>
      <p className="text-sm p-1">
        Căn 2 phòng ngủ: 15 triệu/m2 (khoảng 50m2 - 750 triệu)
      </p>
      <p className="text-sm p-1">
        Căn 3 phòng ngủ: 20 triệu/m2 (khoảng 80m2 - 1,6 tỷ)
      </p>
      <p className="font-semibold p-1">Tiến độ thanh toán chuẩn</p>
      <p className="text-sm p-1">
        Đặt cọc giữ chỗ với Kita Gallery: 500 triệu VNĐ
      </p>
      <p className="text-sm p-1">
        30 ngày sau có thông báo của Kita Gallery, sẽ thanh toán 30% giá trị căn
        hộ + hợp đồng mua bán
      </p>

      <p className="font-semibold mx-auto py-2 text-xl">
        Trân trọng cảm ơn quý khách hàng!
      </p> */}
      <div className="ml-8">
        <Row gutter={16}>
          <Col span={12}>
            <div className=" flex flex-col item-center w-44 h-44 bg-gray-200 rounded-lg ">
              <p className="font-semibold mx-auto py-2 text-lg">Mức giá</p>
              <p className="font-semibold mx-auto py-1 text-red-500 text-lg">
                {formattedNumber}đ
              </p>
              <p className="text-sm mx-auto py-1 text-red-500">
                (
                {(apartment?.price / apartment?.area).toLocaleString("de-DE", {
                  style: "currency",
                  currency: "VND",
                  minimumFractionDigits: 0,
                })}
                /m2)
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className=" flex flex-col item-center  w-44 h-44 bg-gray-200 rounded-lg ">
              <p className="font-semibold mt-auto mx-auto py-1 text-lg">
                Diện tích
              </p>
              <p className="font-semibold mb-auto mx-auto py-1 text-red-500 text-lg">
                {apartment?.area} m2
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className=" flex flex-col item-center w-44 h-44 bg-gray-200 rounded-lg mt-6">
              <p className="font-semibold mx-auto py-2 text-lg">Quy mô</p>
              <p className="text-base mx-auto py-1 text-red-500">
                {apartment?.kitchen} phòng bếp
              </p>
              <p className="text-base mx-auto text-red-500">
                {apartment?.bedRoom} phòng ngủ
              </p>
              <p className="text-base mx-auto py-1 text-red-500">
                {apartment?.livingRoom} phòng sinh hoạt
              </p>
              <p className="text-base mx-auto text-red-500">
                {apartment?.bathRoom} phòng vệ sinh
              </p>
            </div>
          </Col>
          <Col span={12}>
            <div className=" flex flex-col item-center  w-44 h-44 bg-gray-200 rounded-lg mt-6">
              <p className="font-semibold mt-auto mx-auto py-1 text-lg">
                Pháp lý
              </p>
              <p className="font-semibold mb-auto mx-auto py-1 text-red-500 text-lg">
                Đầy đủ
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
