import { Button, Modal, Popconfirm, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAccountStatus,
  getAllAccount,
} from "../../store/slices/accountSlice";
import emailjs from "@emailjs/browser";

export default function AccountRow({ account, stt }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cityName, setCityName] = useState();
  const { city } = useSelector((state) => state.buildingReducer);

  const dispatch = useDispatch();
  const changeConfirm = () => {
    setIsModalOpen(true);
    console.log("account id:", account.id);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChangeAccountStatus = (id) => {
    if (account.status === false) {
      emailjs.send(
        "service_jl7ysfd",
        "template_36w88no",
        {
          name: account.name,
          email: account.email,
        },
        "bwBGvMPUt9Tm4k-2a"
      );
    } else {
      emailjs.send(
        "service_4mcyixq",
        "template_nrmkpoo",
        {
          name: account.name,
          email: account.email,
        },
        "86NmvFbUOMd0EgmqT"
      );
    }

    dispatch(changeAccountStatus(id));

    console.log("account id:", account.id);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const accountCity = city?.find((city) => {
      return city.id === account.cityId;
    });
    setCityName(accountCity.cityName);
  }, []);
  return (
    <div>
      <tr className="flex items-center hover:bg-slate-100">
        <td className="mx-6 py-4">
          <p>{stt}</p>
        </td>
        <td className=" px-6 py-4">
          <div className="w-20 h-20">
            <img src={account?.avatarUrl} alt="" className="w-full h-full" />
          </div>
        </td>
        <td className="whitespace-nowrap px-4 py-4 text-sm w-44">
          {account.email}
        </td>
        <td className="whitespace-nowrap px-3 py-4 w-32 text-sm">
          {account.name}
        </td>
        <td className=" mx-2 py-auto text-sm ml-9 w-20">
          {account.role === "ADMIN"
            ? "Admin"
            : account.role === "INVESTOR"
            ? "Investor"
            : account.role === "AGENCY"
            ? "Agency"
            : account.role === "CUSTOMER"
            ? "Customer"
            : ""}
        </td>
        <td className=" mx-2 py-auto text-sm ml-9 w-32">{cityName}</td>
        <td className="whitespace-nowrap  ml-4 mr-6 text-sm w-28">
          {account.status === true ? (
            <p className="text-blue-400 text-base">Còn hoạt động</p>
          ) : account.status === false ? (
            <p className="text-orange-400 text-base">Ngừng hoạt động</p>
          ) : (
            ""
          )}
        </td>

        <td className="whitespace-nowrap px-2 py-4 ml-7 flex justify-between">
          <Popconfirm
            placement="bottomRight"
            title="Nhắc nhở"
            description="Bạn có muốn đổi trạng thái không?"
            onConfirm={() => handleChangeAccountStatus(account.id)}
            okButtonProps={{
              style: { backgroundColor: "#1ac5ff " },
            }}
            okText="Đổi"
            cancelText="Không"
            cancelButtonProps={{
              style: {
                color: "#1ac5ff ",
              },
            }}
          >
            {account.status === true ? (
              <button
                className="text-white h-8 px-4  mx-1  rounded-md bg-red-500 text-sm"
                onClick={changeConfirm}
              >
                Tắt hoạt động
              </button>
            ) : account.status === false ? (
              <button
                className="text-white h-8 px-4  mx-1  rounded-md bg-green-500 text-sm"
                onClick={changeConfirm}
              >
                Bật hoạt động
              </button>
            ) : (
              ""
            )}
          </Popconfirm>
        </td>
      </tr>
    </div>
  );
}
