import React from "react";
import { Link } from "react-router-dom";

export default function Agency() {
  return (
    <div>
      <ul className="flex flex-col py-4 space-y-1">
        {/* Agency Project */}
        <li>
          <Link
            to={`/agency/own`}
            className={` relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}
          >
            <span className="ml-2 text-sm tracking-wide truncate">
              Căn hộ Của Tôi
            </span>
          </Link>
        </li>
        {/* Project available */}
        <li>
          <Link
            to={`/agency/available_apartment`}
            className={` relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}
          >
            <span className="ml-2 text-sm tracking-wide truncate">
              Căn hộ chưa bàn giao
            </span>
          </Link>
        </li>
        {/* Agency Article */}
        {/* <li>
          <Link
            to={`/agency/article`}
            className={` relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}
          >
            <span className="ml-2 text-sm tracking-wide truncate">
              Bài báo của tôi
            </span>
          </Link>
        </li> */}
        {/* Agency Info */}
        <li>
          <Link
            to={`/agency/info`}
            className={` "font-bold  hover:bg-sky-100" relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}
          >
            <span className="ml-2 text-sm tracking-wide truncate">
              Thông tin cá nhân
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
