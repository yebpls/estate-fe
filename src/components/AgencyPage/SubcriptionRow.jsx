import React, { useEffect } from "react";
import {
  getAppointmentByApartmentId,
  soldApartment,
} from "../../store/slices/appointmentSlice";
import { updateStatusBySubcriptionId } from "../../store/slices/subcriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { Popconfirm } from "antd";

export default function SubcriptionRow({ subcription, stt }) {
  const { appointmentByApartment } = useSelector(
    (state) => state.appointmentReducer
  );
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

  const updateIsSold = (appointId, subId) => {
    console.log("params: ", appointId, subId);
    // dispatch(soldApartment({ appointId: appointId, subId: subId }));
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
          <Popconfirm
            placement="bottomRight"
            title="Xác nhận"
            description="Xác nhận bán căn hộ thành công"
            onConfirm={updateIsSold(
              appointmentByApartment?.id,
              subcription?.id
            )}
            okButtonProps={{
              style: { backgroundColor: "#23FF00 " },
            }}
            okText="Bán"
            cancelText="Hủy"
            cancelButtonProps={{
              style: {
                color: "#1ac5ff ",
              },
            }}
          >
            <span
              // onClick={() =>
              //   updateIsSold(appointmentByApartment?.id, subcription?.id)
              // }
              className=" bg-green-400 hover:bg-green-500 ml-2 p-1 px-2 text-white rounded-lg hover:cursor-pointer"
            >
              Đã bán
            </span>
          </Popconfirm>

          <span
            onClick={() => updateSubcriptionStatus(subcription.id, 1)}
            className=" bg-red-400 hover:bg-red-500 ml-2 p-1 px-2 text-white rounded-lg hover:cursor-pointer"
          >
            Hủy
          </span>
        </a>
      ) : (
        ""
      )}
    </div>
  );
}
