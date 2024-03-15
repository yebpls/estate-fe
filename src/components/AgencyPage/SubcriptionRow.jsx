import React, { useEffect, useState } from "react";
import {
  getAppointmentByApartmentId,
  soldApartment,
  updateMeetingDate,
} from "../../store/slices/appointmentSlice";
import { updateStatusBySubcriptionId } from "../../store/slices/subcriptionSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Empty, Modal, Popconfirm, TimePicker } from "antd";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import moment from "moment";
import customParseFormat from "dayjs/plugin/customParseFormat";
import schemaRegister from "../../yup/schema/schemaRegister";
import { yupResolver } from "@hookform/resolvers/yup";

export default function SubcriptionRow({ subcription, stt }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { appointmentByApartment } = useSelector(
    (state) => state.appointmentReducer
  );
  dayjs.extend(customParseFormat);

  const dispatch = useDispatch();
  const subscribeDate = new Date(subcription?.subscribeDate)
    .toISOString()
    .split("T")[0];
  const updateDate = new Date(subcription?.updateDate)
    .toISOString()
    .split("T")[0];

  const meetingForm = useForm({
    // resolver: yupResolver(schemaRegister),
  });
  const {
    register,
    // formState: { errors },
    handleSubmit,
    control,
    reset,
  } = meetingForm;

  const handleCancel = () => {
    // reset();
    setIsModalOpen(false);
  };

  const makeAnAppointment = () => {
    setIsModalOpen(true);
  };

  const disabledDate = (current) => {
    // Disable dates before the current date
    return current && current < moment().endOf("day");
  };
  const createMeeting = (data) => {
    console.log("Meeting Data:", typeof data.meetingDate);
    // if (!data === undefined) {
    dispatch(
      updateMeetingDate({
        id: subcription?.appointmentId,
        date: data.meetingDate,
      })
    );
    updateSubcriptionStatus(subcription?.id, 2);
    console.log("update data: ", data?.meetingDate, subcription?.appointmentId);
    // }
    reset();
    setIsModalOpen(false);
  };
  const format = "HH:mm";
  const onChange = (time, timeString) => {
    console.log("log", time, timeString);
  };
  const updateSubcriptionStatus = (id, status) => {
    dispatch(updateStatusBySubcriptionId({ id: id, status: status }));
    console.log("data: ", id, status);
  };

  const updateIsSold = (appointId, subId) => {
    console.log("params: ", appointId, subId);
    dispatch(soldApartment({ appointId: appointId, subId: subId }));
  };
  return (
    <div className="flex mt-4 mb-2 text-center w-full">
      <p className="w-1/12 text-base text-slate-700">{stt}</p>
      <p className="w-1/6 text-base text-slate-700 -ml-7">
        {subcription.customerId}
      </p>
      <p className="w-1/5 text-base text-slate-700">{subscribeDate}</p>
      {subcription.subscriptionStatus === 0 ? (
        <p className="w-1/5 text-base text-red-500">Đã mua</p>
      ) : subcription.subscriptionStatus === 1 ? (
        <p className="w-1/5 text-base text-orange-400">Đang chờ hẹn</p>
      ) : subcription.subscriptionStatus === 2 ? (
        <p className="w-1/5 text-base text-green-500">Đã lên lịch gặp</p>
      ) : subcription.subscriptionStatus === 3 ? (
        <p className="w-1/5 text-base text-red-500">Căn hộ đã được bán</p>
      ) : subcription.subscriptionStatus === 4 ? (
        <p className="w-1/5 text-base text-red-500">Vào hàng chờ</p>
      ) : (
        ""
      )}
      {subcription.subscriptionStatus === 0 ? (
        // <p className="w-1/5 text-base text-red-500">Đã bán</p>
        ""
      ) : subcription.subscriptionStatus === 1 ? (
        <a className="w-1/5">
          <span
            onClick={() => makeAnAppointment()}
            className=" bg-orange-400 hover:bg-orange-500 ml-2 p-1 px-2 text-white rounded-lg hover:cursor-pointer"
          >
            Hẹn gặp
          </span>
          <Modal
            title={`Hẹn ngày gặp khách hàng`}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            className="text-cyan-700 mt-40"
          >
            <div>
              <form onSubmit={handleSubmit(createMeeting)}>
                <div className="w-1/2">
                  <p className="text-lg font-bold">Ngày gặp mặt</p>
                  <div className="text-left text-sm  text-red-500">
                    {/* {errors.meetingDate?.message} */}
                  </div>
                  <Controller
                    name="meetingDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        style={{ width: 300 }}
                        disabledDate={disabledDate}
                        placeholder="Chọn ngày gặp mặt"
                        onChange={(date, dateString) =>
                          field.onChange(dateString)
                        }
                        value={field.value ? dayjs(field.value) : null}
                      />
                    )}
                  />
                </div>
                {/* <div className="w-1/2">
                  <p className="text-lg font-bold">Giờ gặp mặt</p>
                  <Controller
                    name="meetingTime"
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        style={{ width: 300 }}
                        onChange={(time, timeString) =>
                          field.onChange(timeString)
                        }
                        format={format}
                        // value={
                        //   field.value
                        //     ? dayjs(field.value, format).toDate()
                        //     : null
                        // }
                      />
                    )}
                  />
                </div> */}
                <button
                  // onClick={() => makeAnAppointment()}
                  // type="submit"
                  className=" bg-orange-400 hover:bg-orange-500 ml-2 p-1 px-2 text-white rounded-lg hover:cursor-pointer"
                >
                  Hẹn gặp
                </button>
              </form>
            </div>
          </Modal>
        </a>
      ) : subcription.subscriptionStatus === 2 ? (
        <a className="w-1/5">
          <Popconfirm
            placement="bottomRight"
            title="Xác nhận"
            description="Xác nhận bán căn hộ thành công"
            onConfirm={() =>
              updateIsSold(appointmentByApartment?.id, subcription?.id)
            }
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
              onClick={() =>
                updateIsSold(appointmentByApartment?.id, subcription?.id)
              }
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
