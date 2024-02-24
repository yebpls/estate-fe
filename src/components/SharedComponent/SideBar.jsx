import React from "react";
import { useSelector } from "react-redux";
import Agency from "./SideBar/Agency";
import Investor from "./SideBar/Investor";
import Customer from "./SideBar/Customer";

export default function SideBar() {
  const { role, id } = useSelector((state) => state.accountReducer);

  return (
    <div>
      <aside className="flex flex-col top-0 left-0 col-span-3 bg-white h-full border-r">
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          {role === "AGENCY" ? (
            <Agency />
          ) : role === "INVESTOR" ? (
            <Investor />
          ) : role === "CUSTOMER" ? (
            <Customer />
          ) : (
            <div></div>
          )}
        </div>
      </aside>
    </div>
  );
}
