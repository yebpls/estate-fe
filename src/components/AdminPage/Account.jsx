import React from "react";
import AccountRow from "./AccountRow";

export default function Account() {
  let status = true;
  return (
    <div className="mx-10 mt-10">
      <p className="m-2 text-center text-2xl  font-semibold text-blue-700">
        Quản lý các tài khoản
      </p>
      <thead className="border-b font-medium dark:border-neutral-500 text-sm">
        <tr>
          <th scope="col" className="inline-block mx-6 py-4">
            STT
          </th>
          <th scope="col" className="inline-block mx-4 py-4 pl-4">
            Ảnh
          </th>
          <th scope="col" className="inline-block ml-40  py-4">
            Email
          </th>
          <th scope="col" className="inline-block ml-36 py-4">
            Tên
          </th>
          <th scope="col" className="inline-block ml-32 py-4">
            Vai trò
          </th>
          <th scope="col" className="inline-block ml-20 py-4">
            Trạng thái
          </th>
          <th scope="col" className="inline-block ml-24 py-4">
            Đổi trạng thái
          </th>
        </tr>
      </thead>
      <AccountRow />
      <AccountRow />
      <AccountRow />
      <AccountRow />
      <AccountRow />
      <AccountRow />
      <AccountRow />
    </div>
  );
}
