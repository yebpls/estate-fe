import { Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Controller, useForm } from "react-hook-form";
import {
  createBookingDistribution,
  setIsChange,
} from "../../store/slices/bookingDistributionSlice";
import { toast } from "react-toastify";
import LoadingComponent from "../SharedComponent/LoadingComponent";

export default function AvailableApartmentRow({ apartment, stt }) {
  const { buildings } = useSelector((state) => state.buildingReducer);
  const { agency, currentUser, balance } = useSelector(
    (state) => state.accountReducer
  );
  const { bookingDistribution, loadingBooking } = useSelector(
    (state) => state.bookingDistributionReducer
  );

  const [building, setBuilding] = useState(null);
  const [booking, setBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formattedNumber = apartment.price.toLocaleString("de-DE");

  const dispatch = useDispatch();

  const options = [
    {
      value: 4 / 1000,
      label: "Mức phí 1: 0.4%. Thời hạn 3 tháng",
    },
    {
      value: 6 / 1000,
      label: "Mức phí 2: 0.6%. Thời hạn 5 tháng",
    },
    {
      value: 8 / 1000,
      label: "Mức phí 3: 0.8%. Thời hạn 8 tháng",
    },
  ];

  const form = useForm();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = form;

  const TakeApartment = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    reset();
    setIsModalOpen(false);
  };
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    // Pad the month and day with leading zeros if necessary
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const onSubmit = (data) => {
    let distributionDate = new Date();
    let expireDistributionDate = new Date();

    const { bookingFee } = data;
    // console.log(typeof bookingFee);
    // console.log(typeof apartment.price);
    // console.log(typeof balance);
    // console.log(bookingFee * apartment.price > balance);

    if (!bookingFee || bookingFee * apartment.price > balance) {
      console.log(bookingFee * apartment.price > balance);
      toast.error("Số dư không đủ");
    } else {
      if (bookingFee === 4 / 1000)
        expireDistributionDate.setMonth(distributionDate.getMonth() + 3);
      if (bookingFee === 6 / 1000)
        expireDistributionDate.setMonth(distributionDate.getMonth() + 5);
      if (bookingFee === 8 / 1000)
        expireDistributionDate.setMonth(distributionDate.getMonth() + 8);

      const createDate = formatDateToYYYYMMDD(new Date());
      const updateDate = createDate; // Assuming updateDate is the same as createDate
      distributionDate = formatDateToYYYYMMDD(distributionDate);
      expireDistributionDate = formatDateToYYYYMMDD(expireDistributionDate);

      const params = {
        ...data,
        createDate,
        updateDate,
        distributionDate,
        expireDistributionDate,
        agencyId: agency?.id,
        bookingStatus: 2,
        apartmentId: apartment.id,
      };
      // dispatch(createBookingDistribution(params));
      console.log("param: ", params);
      handleCancel();
    }
  };

  useEffect(() => {
    if (buildings) {
      const buildingItem = buildings?.find(
        (item) => item.id === apartment.buildingId
      );
      setBuilding(buildingItem);
    }

    const bookingItem = bookingDistribution?.find(
      (item) => item?.apartmentId === apartment?.id
    );
    setBooking(bookingItem); // This will be `undefined` if no booking matches, which is falsy
  }, [apartment, buildings, bookingDistribution]); // Ensure bookingDistribution is a dependency

  return (
    <div>
      <LoadingComponent
        loadingDependency={loadingBooking}
        message={"Đang nhận căn hộ"}
      />
      <tr className="flex items-center hover:bg-slate-100">
        <td className="mx-6 py-4 w-3">
          <p>{stt}</p>
        </td>
        <td className=" px-6 py-4">
          <div className="w-40 h-20">
            <img src={apartment.mainImage} alt="" className="w-full h-full" />
          </div>
        </td>
        <td className="whitespace-nowrap px-6 ml-2 py-4 text-sm w-6">
          {apartment.apartmentNumber}
        </td>
        <td className="whitespace-nowrap px-6 ml-14 py-4  w-32 text-sm">
          {formattedNumber}đ
        </td>
        <td className=" mx-2 py-auto text-sm ml-14 w-20">
          {apartment.projectName}
        </td>
        <td className="whitespace-nowrap ml-12 w-24 text-sm">
          {building?.buildingName}
        </td>
        <td className="whitespace-nowrap  ml-10 mr-6 text-sm text-green-500">
          {apartment.status === 0 ? "Đã bán" : ""}
          {apartment.status === 1 ? "Còn mở đăng ký bán" : ""}
          {apartment.status === 2 ? "Đã có agency đăng ký" : ""}{" "}
        </td>

        <td className="whitespace-nowrap px-2 py-4 ml-4 flex justify-between">
          {apartment.status !== 1 ? (
            ""
          ) : (
            <button
              className="text-white h-8 px-4  mx-1  rounded-md bg-green-600 text-sm"
              onClick={TakeApartment}
            >
              Nhận
            </button>
          )}

          <Modal
            title={`Bạn có muốn nhận căn hộ phòng ${apartment.apartmentNumber}, thuộc dự án ${apartment.projectName}?`}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
            className="text-cyan-700 mt-40"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-lg font-bold mb-2">
                Giá trị căn hộ: {formattedNumber}đ{" "}
              </h2>
              <p>Số dư của bạn: {balance.toLocaleString("de-DE")}đ</p>
              <div className="mb-8">
                <p className="mb-2">Mức phí nhận bán hộ*</p>
                <Controller
                  name="bookingFee"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      style={{ width: 300 }}
                      placeholder={"Chọn mức phí"}
                      // defaultValue={options[0].value}
                      onChange={(value) => field.onChange(value)}
                      options={options}
                    />
                  )}
                />
                <p>
                  0.4%: {(apartment.price * 0.004).toLocaleString("de-DE")}đ
                </p>
                <p>
                  0.6%: {(apartment.price * 0.006).toLocaleString("de-DE")}đ
                </p>
                <p>
                  0.8%: {(apartment.price * 0.008).toLocaleString("de-DE")}đ
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleCancel}
                  className="px-2 py-1 text-white border-transparent bg-red-500 hover:text-red-500 hover:bg-white hover:border-red-500 mr-2"
                >
                  Không nhận
                </button>
                <button
                  type="submit"
                  className="px-2 py-1 !text-white border-transparent !bg-sky-500 !hover:text-sky-500 !hover:bg-white !hover:border-sky-500"
                >
                  Nhận
                </button>
              </div>

              <div className="mt-10">
                <p className="text-xs text-gray-400">
                  *Mức phí chính là số tiền bạn phải trả cho chủ đầu tư khi
                  không bán được căn hộ theo thời gian của mức phí
                </p>
                <p className="text-xs text-gray-400">
                  **Khi bạn bán được căn hộ, bạn sẽ nhận được 1% giá trị bán căn
                  hộ
                </p>
              </div>
            </form>
          </Modal>
        </td>
      </tr>
    </div>
  );
}
