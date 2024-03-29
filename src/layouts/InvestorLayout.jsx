import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getInvestorId } from "../store/slices/accountSlice";
import SideBar from "../components/SharedComponent/SideBar";

function InvestorLayout() {
  const { investor, id } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInvestorId(id));
  }, [id, dispatch]);
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default InvestorLayout;
