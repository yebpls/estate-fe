import React, { useEffect } from "react";
import InvestorSidebar from "../components/InvestorPage/InvestorSidebar";
import { Outlet } from "react-router-dom";
import InvestorInfo from "../components/InvestorPage/InvestorInfo";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getInvestorId } from "../store/slices/accountSlice";

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
        <InvestorSidebar />
        <Outlet />
      </div>
    </div>
  );
}

export default InvestorLayout;
