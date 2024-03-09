import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SharedComponent/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getAgencyId, getCustomerId } from "../store/slices/accountSlice";
import { getAllBuilding } from "../store/slices/buildingSlice";

export default function CustomerLayout() {
  const { id } = useSelector((state) => state.accountReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBuilding());
    dispatch(getCustomerId(id));
  }, [dispatch, id]);
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
