import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import storageService from "./config/storageService";

import Protected from "./components/Protected";
import { useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import accountApi from "./api/accountApi";
import { jwtDecode } from "jwt-decode";
import ApartmentDetail from "./pages/ApartmentDetail";
<<<<<<< HEAD
import ProjectOfInvestor from "./components/InvestorPage/ProjectOfInvestor";
import ApartmentOfInvestor from "./components/InvestorPage/ApartmentOfInvestor";
import BuildingOfInvestor from "./components/InvestorPage/BuildingOfInvestor";
=======
>>>>>>> origin/sontt

function App() {
  const { isLogin } = useSelector((state) => state.accountReducer);

  useEffect(() => {
    let token = storageService.getAccessToken();
    console.log(isLogin);
    if (token) {
      token = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > token.expire) {
        // storageService.removeAccessToken();
        storageService.setAccessToken("");
        // dispatch(setIsLogin(false));
        storageService.removeRole();
        // dispatch(setRole(""));
      } else {
        // dispatch(setIsLogin(true));
        // dispatch(setRole(token[ROLE]));
        storageService.setRole(token.role);
      }
    }
  }, []);

  useEffect(() => {
    // fetch();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
          <Route path="/investor" element={<ProjectOfInvestor />} />
          <Route path="/investor_building" element={<BuildingOfInvestor />} />
          <Route path="/investor_apartment" element={<ApartmentOfInvestor />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <Protected isAccess={isLogin}>
              <RegisterPage />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
