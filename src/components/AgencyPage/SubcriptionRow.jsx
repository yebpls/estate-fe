import React, { useEffect } from "react";
import { getAppointmentByApartmentId } from "../../store/slices/appointmentSlice";
import { getSubcriptionByAppointmentId } from "../../store/slices/subcriptionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SubcriptionRow({ subcription, stt }) {
  const subscribeDate = new Date(subcription?.subscribeDate)
    .toISOString()
    .split("T")[0];
  const updateDate = new Date(subcription?.updateDate)
    .toISOString()
    .split("T")[0];

  return (
    <div className="flex mt-4 mb-2">
      <p className="w-1/6 text-base text-slate-700">{stt}</p>
      <p className="w-1/6 text-base text-slate-700 -ml-7">
        {subcription.customerId}
      </p>
      <p className="w-1/5 text-base text-slate-700">{subscribeDate}</p>
      {subcription.subscriptionStatus === 0 ? (
        <p className="w-1/5 text-base text-slate-700">Đã mua</p>
      ) : subcription.subscriptionStatus === 1 ? (
        <p className="w-1/5 text-base text-orange-400">Đang chờ hẹn</p>
      ) : subcription.subscriptionStatus === 2 ? (
        <p className="w-1/5 text-base text-green-500">Đã lên lịch gặp</p>
      ) : (
        ""
      )}
      <div className="w-1/4 text-base text-slate-700">
        <button className="bg-green-400 hover:bg-green-500 p-1 px-2 text-white">
          Cập nhật
        </button>
      </div>
    </div>
  );
}
