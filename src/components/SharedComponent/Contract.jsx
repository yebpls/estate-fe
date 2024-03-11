import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContractByAppointment } from "../../store/slices/contractSlice";
import { useParams } from "react-router-dom";

export default function Contract() {
  const { apartmentDetail } = useSelector((state) => state.apartmentReducer);
  const { contractForAgency } = useSelector((state) => state.contractReducer);
  const { buildings } = useSelector((state) => state.buildingReducer);
  const building = buildings?.find(
    (building) => building.id === apartmentDetail?.buildingId
  );
  const price = apartmentDetail?.price.toLocaleString("de-DE");
  const signDate = new Date(contractForAgency?.signDate)
    .toISOString()
    .split("T")[0];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContractByAppointment(19));
    console.log(building, apartmentDetail);
  }, []);
  return (
    <div className="w-full">
      <Row gutter={16}>
        <Col span={12}>
          <div className="text-center mt-5 text-xl font-semibold text-slate-600 mb-5">
            Hợp đồng bên đại lý
          </div>
          <p className="text-center text-lg font-semibold text-slate-700">
            Cộng hòa-Xã hội-Chủ Nghĩa Việt Nam
          </p>
          <p className="text-center text-md font-medium text-slate-700">
            Độc lập-Tự do-Hạnh phúc
          </p>
          <p className="text-center my-1 text-base font-semibold">
            Hợp đồng mua bán nhà
          </p>

          <div
            className="ml-7 mt-3 text-base overflow-y-auto"
            style={{ height: "400px" }}
          >
            <p className="p-1">
              Đại diện bên bán(Đại lý): {contractForAgency?.agencyName}
            </p>
            <p className="p-1">
              Đại diện bên mua(Khách): {contractForAgency?.customerName}
            </p>
            <p className="p-1">Địa điểm ký kết hợp đồng: address </p>
            <p className="p-1">Ngày ký kết hợp đồng: {signDate}</p>
            <p className="p-1">Giá trị hợp đồng: {price}đ</p>
            <p className="p-1 text-sm">
              (Sau đây xin phép được tạm gọi bên bán nhà là bên A và bên mua nhà
              là bên B)
            </p>

            <p className="p-1">MÔ TẢ TÀI SẢN:</p>
            <p className="p-1">Loại hình tài sản: Căn hộ chung cư</p>
            <p className="p-1">
              Căn hộ số {apartmentDetail?.apartmentNumber} tòa{" "}
              {building?.buildingName} thuộc dự án{" "}
              {apartmentDetail?.apartmentNumber}
            </p>
            <p className="p-1">Địa chỉ: {apartmentDetail?.address}</p>
            <p className="p-1">Diện tích sử dụng: {apartmentDetail?.area} m2</p>
            <p className="p-1">Số phòng khách: {apartmentDetail?.livingRoom}</p>
            <p className="p-1">Số phòng ăn: {apartmentDetail?.kitchen}</p>
            <p className="p-1">Số phòng ngủ: {apartmentDetail?.bedRoom}</p>
            <p className="p-1">Số phòng vệ sinh: {apartmentDetail?.bathRoom}</p>
            <p className="p-1">Tình trạng pháp lý: Đầy đủ</p>
            <p className="p-1">Giá trị: {price}đ</p>
          </div>
        </Col>
        <Col
          span={12}
          className="text-center mt-5 text-xl font-semibold text-slate-600"
        >
          <div>Hợp đồng khách mua</div>
        </Col>
      </Row>
    </div>
  );
}
