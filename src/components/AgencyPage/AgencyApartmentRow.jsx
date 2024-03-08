import { Button, Modal, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getApartmentById } from "../../store/slices/apartmentSlice";
import AppointmentModal from "./AppointmentModal";
import { getSubcriptionByAppointmentId } from "../../store/slices/subcriptionSlice";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";
import ViewAppointment from "./ViewAppointment";
import { getAllBuilding } from "../../store/slices/buildingSlice";
import { cancelBookingDistribution } from "../../store/slices/bookingDistributionSlice";

export default function AgencyApartmentRow({ apartment, stt }) {
  const { buildings } = useSelector((state) => state.buildingReducer);
  const [building, setBuilding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { apartmentDetail } = useSelector((state) => state.apartmentReducer);
  const dispatch = useDispatch();

  const deleteProject = (id) => {
    dispatch(cancelBookingDistribution(id));
    // console.log(id);
  };
  const cancelDelete = () => {};
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
    // console.log("building: ", buildings);
  }, [apartment, buildings]);
  return (
    <div>
      <tr className="flex items-center hover:bg-slate-100">
        <div
          // to="/agency/own/booking"
          className=" hover:bg-slate-100 flex items-center p-2 rounded-md"
        >
          <td className="mx-6 py-4 w-2">
            <p>{stt}</p>
          </td>
          <td className=" px-6 py-4 w-52">
            <div className="w-40 h-20">
              <img
                src={apartment?.mainImage}
                alt=""
                className="w-full h-full"
              />
            </div>
          </td>
          <td className="whitespace-nowrap px-3 mx-2 w-12  py-4 text-sm">
            {apartment?.apartmentNumber}
            {/* {booking.id} */}
          </td>
          <td className="whitespace-nowrap w-20 ml-12  py-4 text-sm">
            {formattedNumber}đ
          </td>
          <td className=" mx-2 py-auto text-sm ml-14 w-12">
            {apartment?.projectName}
          </td>
          <td className="whitespace-nowrap  ml-11 mr-6  w-7 py-4 text-sm">
            {building?.buildingName}
          </td>
          <td className="whitespace-nowrap  ml-16 mr-6 w-4  py-4 text-sm">
            {apartment?.bookingFee * 100}%
          </td>
          <td className="whitespace-nowrap  ml-16 mr-6  w-12 py-4 text-sm">
            {distributionDate}
          </td>
          <td className="whitespace-nowrap ml-20 w-12 py-4 text-sm">
            {expireDistributionDate}
          </td>
          <td className="whitespace-nowrap ml-20 w-12 py-4 text-sm">
            <Link
              to={`/agency/appointment/apartment/${apartment.id}`}
              state={{ buildingName: building?.buildingName }}
            >
              <button className="text-white h-8 px-4  mx-1  rounded-md bg-orange-400 text-sm hover:bg-orange-500">
                Xem
              </button>
            </Link>
          </td>
        </div>
        {/* <td className="whitespace-nowrap px-6 py-4">
  {pet.isSold ? "Đã bán" : "Chưa bán"}
</td> */}
        <td className="whitespace-nowrap py-4 flex justify-between">
          <Popconfirm
            placement="bottomRight"
            title="Nhắc nhở"
            description="Nếu bạn huỷ bạn sẽ mất tiền cọc cho căn hộ này?"
            onConfirm={() => deleteProject(apartment.bookingId)}
            okButtonProps={{
              style: { backgroundColor: "red " },
            }}
            onCancel={cancelDelete}
            cancelButtonProps={{
              style: {
                color: "red ",
              },
            }}
            okText="Hủy"
            cancelText="Không"
          >
            <button className="text-white h-8 px-4  mx-1  rounded-md bg-red-500 text-sm hover:bg-red-600">
              Hủy
            </button>
          </Popconfirm>
        </td>
      </tr>
    </div>
  );
}
