import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import storageService from "../config/storageService";
import { useSelector } from "react-redux";

function ProtectRole({ children, role }) {
  useEffect(() => {
    console.log(role);
  }, [role]);
  switch (role) {
    case "ADMIN":
      return children;
    case "INVESTOR":
      return children;
    case "AGENCY":
      return children;
    case "CUSTOMER":
      return children;

    default:
      return <Navigate to="/" />;
  }
}

export default ProtectRole;
