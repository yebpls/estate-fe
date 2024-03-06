import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div>
      <ul className="flex flex-col py-4 space-y-1">
        {/* Admin Manage Account */}
        <li>
          <Link
            to={`/admin/manage_account`}
            className={` relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}
          >
            <span className="ml-2 text-sm tracking-wide truncate">
              Quản lý các tài khoản
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={`/admin/transactions`}
            className={` relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}
          >
            <span className="ml-2 text-sm tracking-wide truncate">
              Quản lý các giao dịch
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
