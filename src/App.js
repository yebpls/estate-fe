import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import storageService from "./config/storageService";

import Protected from "./components/Protected";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import accountApi from "./api/accountApi";
import { jwtDecode } from "jwt-decode";
import ApartmentDetail from "./pages/ApartmentDetail";
import InvestorLayout from "./layouts/InvestorLayout";
import InvestorProject from "./components/InvestorPage/InvestorProject";
import InvestorInfo from "./components/InvestorPage/InvestorInfo";
import InvestorApartment from "./components/InvestorPage/InvestorApartment";
import {
  getInvestorId,
  setAccId,
  setIsLogin,
  setRole,
} from "./store/slices/accountSlice";
import { getAllCity } from "./store/slices/buildingSlice";

function App() {
  const { isLogin, role, id } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    let token = storageService.getAccessToken();
    // console.log(isLogin);
    if (token) {
      token = jwtDecode(token);
      // console.log(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > token.expire) {
        // storageService.removeAccessToken();
        storageService.setAccessToken("");
        // dispatch(setIsLogin(false));
        storageService.removeRole();
        // dispatch(setRole(""));
      } else {
        dispatch(setIsLogin(true));
        dispatch(setRole(token.role));
        dispatch(setAccId(token.sub));
        storageService.setRole(token.role);
      }
    }
  }, []);

  useEffect(() => {
    dispatch(getAllCity());
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
        </Route>
        <Route path="/investor" element={<InvestorLayout />}>
          <Route index element={<Navigate to="/investor/project" />} />
          <Route path="/investor/project" element={<InvestorProject />} />
          <Route path="/investor/info" element={<InvestorInfo />} />
          <Route
            path="/investor/project/:projectId"
            element={<InvestorApartment />}
          />
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
