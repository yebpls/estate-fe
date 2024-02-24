import React from "react";
import { Link } from "react-router-dom";

export default function Customer() {
  return (
    <div>
      <ul className="flex flex-col py-4 space-y-1">
        {/* Customer Booking */}
        <li>
          <Link
            to={`/customer/booking_apartment`}
            className={` relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}
          >
            <span className="ml-2 text-sm tracking-wide truncate">
              Cuộc hẹn
            </span>
          </Link>
        </li>
        {/* Customer Info */}
        <li>
          <Link
            to={`/customer/info`}
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
