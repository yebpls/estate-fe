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
import { yupResolver } from "@hookform/resolvers/yup";
import schemaMeetingDate from "../../yup/schema/schemaMeetingDate";
import emailjs from "@emailjs/browser";

export default function SubcriptionRow({ subcription, stt }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { appointmentByApartment } = useSelector(
    (state) => state.appointmentReducer
  );
  const { apartmentDetail } = useSelector((state) => state.apartmentReducer);
  dayjs.extend(customParseFormat);

  const dispatch = useDispatch();
  const newSubscribeDate = new Date(subcription?.subscribeDate)
    .toISOString()
    .split("T")[0]
    .split("-");

  const subscribeDate =
    newSubscribeDate[2] + "-" + newSubscribeDate[1] + "-" + newSubscribeDate[0];

  const meetingForm = useForm({
    resolver: yupResolver(schemaMeetingDate),
  });
  const {
    register,
    formState: { errors },
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

  function sendMeetingMail(meetingDate) {
    emailjs.send(
      "service_6sqc535",
      "template_870wils",
      {
        name: "Đội ngũ Nhà Đẹp",
        message: `Kính gửi quý khách, đội ngũ nhà đẹp thay mặt đại lý mời quý khách đến khảo sát căn hộ số ${apartmentDetail?.apartmentNumber} thuộc dự án ${apartmentDetail?.projectName} tại ${apartmentDetail?.address} vào ngày ${meetingDate}. Rất kính mong quý khách có thể bỏ chút thời gian để hợp tác cùng đội ngũ của chúng tôi.`,
      },
      "IjYZDWDVeJohW3KBo"
    );
  }
  const createMeeting = async (data) => {
    console.log("Meeting Data:", typeof data.meetingDate);
    if (data) {
      const changeDate = data.meetingDate.split("-");
      const newMeetingData =
        changeDate[2] + "-" + changeDate[1] + "-" + changeDate[0];
      const mailDate =
        changeDate[0] + "-" + changeDate[1] + "-" + changeDate[2];
      await dispatch(
        updateMeetingDate({
          id: subcription?.appointmentId,
          date: newMeetingData,
        })
      );
      await updateSubcriptionStatus(subcription?.id, 2);
      sendMeetingMail(mailDate);
    }
    reset();
    setIsModalOpen(false);
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
                  <p className="text-lg font-bold my-4">Ngày gặp mặt</p>

                  <Controller
                    name="meetingDate"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        style={{ width: 300 }}
                        disabledDate={disabledDate}
                        placeholder="Chọn ngày gặp mặt"
                        format={"DD-MM-YYYY"}
                        onChange={(date, dateString) =>
                          field.onChange(dateString)
                        }
                        value={
                          field.value ? dayjs(field.value, "DD/MM/YYYY") : null
                        }
                      />
                    )}
                  />
                  <div className="text-left m-2 text-sm  text-red-500">
                    {errors.meetingDate?.message}
                  </div>
                </div>
                <div className="w-full mt-10">
                  <button className="bg-orange-400 hover:bg-orange-500 ml-2 p-1 px-2 text-white rounded-lg hover:cursor-pointer absolute right-16 bottom-4">
                    Hẹn gặp khách
                  </button>
                </div>
                {/* <a className="w-full mt-10">
                  <span
                    // onClick={() => createMeetingDate()}

                    className="bg-orange-400 hover:bg-orange-500 ml-2 p-1 px-2 text-white rounded-lg hover:cursor-pointer absolute right-16 bottom-4"
                  >
                    Hẹn gặp khách
                  </span>
                </a> */}
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
            <span className=" bg-green-400 hover:bg-green-500 ml-2 p-1 px-2 text-white rounded-lg hover:cursor-pointer">
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
