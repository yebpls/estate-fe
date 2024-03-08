import React, { useEffect } from "react";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";
import { updateStatusBySubcriptionId } from "../../store/slices/subcriptionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SubcriptionRow({ subcription, stt }) {
  const dispatch = useDispatch();
  const subscribeDate = new Date(subcription?.subscribeDate)
    .toISOString()
    .split("T")[0];
  const updateDate = new Date(subcription?.updateDate)
    .toISOString()
    .split("T")[0];

  const updateSubcriptionStatus = (id, status) => {
    dispatch(updateStatusBySubcriptionId({ id: id, status: status }));
    console.log("data: ", id, status);
  };

  return (
    <div className="flex mt-4 mb-2 text-center w-full">
      <p className="w-1/12 text-base text-slate-700">{stt}</p>
      <p className="w-1/6 text-base text-slate-700 -ml-7">
        {subcription.customerId}
      </p>
      <p className="w-1/5 text-base text-slate-700">{subscribeDate}</p>
      {subcription.subscriptionStatus === 0 ? (
        <p className="w-1/5 text-base text-red-500">Đã bán</p>
      ) : subcription.subscriptionStatus === 1 ? (
        <p className="w-1/5 text-base text-orange-400">Đang chờ hẹn</p>
      ) : subcription.subscriptionStatus === 2 ? (
        <p className="w-1/5 text-base text-green-500">Đã lên lịch gặp</p>
      ) : (
        ""
      )}
      {subcription.subscriptionStatus === 0 ? (
        <p className="w-1/5 text-base text-red-500">Đã bán</p>
      ) : subcription.subscriptionStatus === 1 ? (
        <a className="w-1/5">
          <span
            onClick={() => updateSubcriptionStatus(subcription.id, 2)}
            className=" bg-orange-400 hover:bg-orange-500 ml-2 p-1 px-2 text-white rounded-lg hover:cursor-pointer"
          >
            Hẹn gặp
          </span>
        </a>
      ) : subcription.subscriptionStatus === 2 ? (
        <a className="w-1/5">
          <span
            onClick={() => updateSubcriptionStatus(subcription.id, 0)}
            className=" bg-green-400 hover:bg-green-500 ml-2 p-1 px-2 text-white rounded-lg hover:cursor-pointer"
          >
            Đã bán
          </span>
        </a>
      ) : (
        ""
      )}
    </div>
  );
}
