import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getAgencyId } from "../store/slices/accountSlice";
import SideBar from "../components/SharedComponent/SideBar";
import { getAllBookingDistributionByAgencyId } from "../store/slices/bookingDistributionSlice";
import { getAllApartment } from "../store/slices/apartmentSlice";

function AgencyLayout() {
  const { agency, id } = useSelector((state) => state.accountReducer);
  const { isChange } = useSelector((state) => state.bookingDistributionReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAgencyId(id));
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllBookingDistributionByAgencyId(agency.id));
  }, [agency, isChange]);
  useEffect(() => {
    dispatch(getAllApartment());
  }, [isChange, dispatch]);
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
