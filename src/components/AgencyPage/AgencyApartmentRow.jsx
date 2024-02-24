import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getApartmentById } from "../../store/slices/apartmentSlice";

export default function AgencyApartmentRow({ apartment, stt }) {
  const { buildings } = useSelector((state) => state.buildingReducer);
  const [building, setBuilding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { apartmentDetail } = useSelector((state) => state.apartmentReducer);

  const dispatch = useDispatch();
  const DeleteConfirm = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // useEffect(() => {
  //   dispatch(getApartmentById(booking.apartmentId));
  // }, [booking.id, dispatch]);
  const formattedNumber = apartment.price.toLocaleString("de-DE");
  const distributionDate = new Date(apartment?.distributionDate)
    .toISOString()
    .split("T")[0];
  const expireDistributionDate = new Date(apartment?.expireDistributionDate)
    .toISOString()
    .split("T")[0];
  useEffect(() => {
    if (buildings) {
      const buildingItem = buildings.find(
        (item) => item.id === apartment.buildingId
      );
      setBuilding(buildingItem);
    }
  }, [apartment, buildings]);
  return (
    <div>
      <tr className="flex items-center hover:bg-slate-100">
        <Link
          to="/agency/own/booking"
          className=" hover:bg-slate-100 flex items-center p-2 rounded-md"
        >
          <td className="mx-6 py-4">
            <p>{stt}</p>
          </td>
          <td className=" px-6 py-4">
            <div className="w-40 h-20">
              <img
                src={apartment?.mainImage}
                alt=""
                className="w-full h-full"
              />
            </div>
          </td>
          <td className="whitespace-nowrap px-6 mx-2  py-4 text-sm">
            {apartment?.apartmentNumber}
            {/* {booking.id} */}
          </td>
          <td className="whitespace-nowrap w-20 ml-6  py-4 text-sm">
            {formattedNumber}đ
          </td>
          <td className=" mx-2 py-auto text-sm ml-14">
            {apartment?.projectName}
          </td>
          <td className="whitespace-nowrap  ml-10 mr-6   py-4 text-sm">
            {building?.buildingName}
          </td>
          <td className="whitespace-nowrap  ml-16 mr-6   py-4 text-sm">
            {apartment?.bookingFee * 100}%
          </td>
          <td className="whitespace-nowrap  ml-10 mr-6   py-4 text-sm">
            {distributionDate}
          </td>
          <td className="whitespace-nowrap  ml-14    py-4 text-sm">
            {expireDistributionDate}
          </td>
        </Link>
        {/* <td className="whitespace-nowrap px-6 py-4">
  {pet.isSold ? "Đã bán" : "Chưa bán"}
</td> */}
        <td className="whitespace-nowrap ml-10 py-4 flex justify-between">
          <button
            className="text-white h-8 px-4  mx-1  rounded-md bg-red-500 text-sm"
            onClick={DeleteConfirm}
          >
            Hủy
          </button>
          <Modal
            okText="Hủy"
            okButtonProps={{ style: { backgroundColor: "red" } }}
            title="Bạn có muốn hủy dự án này không?"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            cancelText="Không"
            className="text-cyan-700 mt-40"
          ></Modal>
        </td>
      </tr>
    </div>
  );
}
