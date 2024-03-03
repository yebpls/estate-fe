import React, { useEffect } from "react";
import AccountRow from "./AccountRow";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount } from "../../store/slices/accountSlice";

export default function Account() {
  const { loading, accountForAdmin, loadingButton } = useSelector(
    (state) => state.accountReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAccount());
  }, [dispatch]);
  return (
    <div className="mx-10 mt-10">
      <div className="ml-96 flex">
        <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
          Quản lý các tài khoản
        </p>
        {loadingButton ? (
          <div className="flex justify-center items-right ml-96 h-[40px]">
            <Spin size="small" />
            <p className="text-base ml-5 text-blue-500 ml-">Chờ tý nhé</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <thead className="border-b font-medium dark:border-neutral-500 text-sm">
        <tr>
          <th scope="col" className="inline-block mx-6 py-4">
            STT
          </th>
          <th scope="col" className="inline-block mx-4 py-4 pl-4">
            Ảnh
          </th>
          <th scope="col" className="inline-block ml-12  py-4">
            Email
          </th>
          <th scope="col" className="inline-block ml-32 py-4">
            Tên
          </th>
          <th scope="col" className="inline-block ml-32 py-4">
            Vai trò
          </th>
          <th scope="col" className="inline-block ml-20 py-4">
            Tỉnh/Thành Phố
          </th>
          <th scope="col" className="inline-block ml-12 py-4">
            Trạng thái
          </th>
          <th scope="col" className="inline-block ml-28 py-4">
            Đổi trạng thái
          </th>
        </tr>
      </thead>
      {loading ? (
        <div className="flex justify-center mx-auto items-center h-[200px]">
          <Spin size="large" />
          <p className="text-xl font-semibold ml-5 text-blue-500">Chờ tý nhé</p>
        </div>
      ) : (
        accountForAdmin &&
        accountForAdmin.map((account, index) => (
          <div>
            <AccountRow
              key={account.id}
              stt={index + 1}
              account={account}
            ></AccountRow>
          </div>
        ))
      )}
    </div>
  );
}
