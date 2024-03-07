import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createSubcription } from "../../store/slices/subcriptionSlice";
import { toast } from "react-toastify";
import LoadingComponent from "../SharedComponent/LoadingComponent";

export default function AgencyInfo({ agency, appointment, apartmentId }) {
  const { city } = useSelector((state) => state.buildingReducer);
  const { role } = useSelector((state) => state.accountReducer);
  const cityName = city.find((city) => city.id === agency?.cityId);
  //GET CURRENT DATE
  const date = new Date();
  const dateDay = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const dateMonth =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  const dispatch = useDispatch();
  const currentDate = `${date.getFullYear()}-${dateMonth}-${dateDay}`;
  const makeASubcription = () => {
    const params = {
      subscribeDate: currentDate,
      updateDate: currentDate,
      subscriptionStatus: 1,
      customerId: 1,
      appointmentId: appointment.id,
      apartmentId: apartmentId,
    };
    if (role !== "CUSTOMER") {
      toast.error("Bạn hãy vui lòng đăng nhập với vai trò là khách");
    } else {
      dispatch(createSubcription(params));
    }
  };
  //   useEffect(() => {
  //     console.log("use effect for sub param:", params);
  //   }, []);
  return (
    <div className="w-60 h-80 m-5 grid text-center bg-gray-100 rounded-md">
      <div className="p-3 w-28 h-28 mx-auto">
        <img
          className="mx-auto w-full h-full rounded-full"
          src={agency?.avatarUrl}
          alt="Description of your image"
        />
      </div>
      <p className="font-semibold text-sm p-1">Được đăng bởi</p>
      <p className="text-lg text-red-500 font-medium">{agency?.name}</p>
      <p className="text-gray-500">Đến từ: {cityName?.cityName}</p>
      <Link to="" className=" px-2 text-gray-500">
        {agency?.email}
      </Link>

      <button
        onClick={makeASubcription}
        className="w-2/3 mx-auto m-2 bg-orange-500 text-white text-sm font-semibold border-none hover:bg-orange-200 hover:text-orange-400"
      >
        Tạo cuộc hẹn xem nhà
      </button>
    </div>
  );
}
