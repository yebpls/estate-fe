import React from "react";
import { Link } from "react-router-dom";

export default function InvestorSidebar() {
  return (
    <div>
      <aside className="flex flex-col top-0 left-0 col-span-3 bg-white h-full border-r">
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li>
              <Link
                to={`/investor/project`}
                className={` relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}
              >
                <span className="ml-2 text-sm tracking-wide truncate">
                  Dự án
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={`/investor/info`}
                className={` "font-bold  hover:bg-sky-100" relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-sky-500 p-6`}
              >
                <span className="ml-2 text-sm tracking-wide truncate">
                  Thông tin cá nhân
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
