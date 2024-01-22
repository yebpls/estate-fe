import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import storageService from "../config/storageService";
import { useSelector } from "react-redux";

function Protected({ children, isAccess }) {
  useEffect(() => {
    console.log(isAccess);
  }, [isAccess]);
  switch (isAccess) {
    case false:
      return children;

    case true:
      return <Navigate to="/" />;
  }
}

export default Protected;
