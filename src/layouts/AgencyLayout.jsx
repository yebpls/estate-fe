import React, { useEffect } from "react";
import InvestorSidebar from "../components/InvestorPage/InvestorSidebar";
import { Outlet } from "react-router-dom";
import InvestorInfo from "../components/InvestorPage/InvestorInfo";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getInvestorId } from "../store/slices/accountSlice";
import SideBar from "../components/SharedComponent/SideBar";

function AgencyLayout() {
  // const { agency, id } = useSelector((state) => state.accountReducer);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getInvestorId(id));
  // }, [id, dispatch]);
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

export default AgencyLayout;
