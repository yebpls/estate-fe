import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import storageService from "./config/storageService";

import Protected from "./components/Protected";
import ProtectRole from "./components/ProtectRole";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./layouts/MainLayout";
import accountApi from "./api/accountApi";
import { jwtDecode } from "jwt-decode";
import ApartmentDetail from "./pages/ApartmentDetail";
import InvestorLayout from "./layouts/InvestorLayout";
import InvestorProject from "./components/InvestorPage/InvestorProject";
import InvestorApartment from "./components/InvestorPage/InvestorApartment";
import {
  getAccountDetail,
  getInvestorId,
  setAccId,
  setCurrentUser,
  setIsLogin,
  setRole,
} from "./store/slices/accountSlice";
import { getAllBuilding, getAllCity } from "./store/slices/buildingSlice";
import AgencyLayout from "./layouts/AgencyLayout";
import AvailableApartment from "./components/AgencyPage/AvailableApartment";
import AgencyApartment from "./components/AgencyPage/AgencyApartment";
import Article from "./components/AgencyPage/Article";
import Booking from "./components/AgencyPage/Booking";
import AccountInfo from "./components/SharedComponent/AccountInfo";
import CustomerLayout from "./layouts/CustomerLayout";
import BookingApartment from "./components/CustomerPage/BookingApartment";
import AdminLayout from "./layouts/AdminLayout";
import Account from "./components/AdminPage/Account";
import PaymentPage from "./pages/PaymentPage";
import AllApartment from "./pages/AllApartment";
import NoPage from "./pages/NoPage";
import TransactionsPage from "./pages/TransactionsPage";
import Subcription from "./components/AgencyPage/Subcription";
import AccountBalance from "./components/SharedComponent/AccountBalance";
import Contract from "./components/SharedComponent/Contract";

function App() {
  const { isLogin, role, id } = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  // const navigate = useNavigation();

  useEffect(() => {
    let token = storageService.getAccessToken();
    // console.log(isLogin);
    if (token) {
      token = jwtDecode(token);
      // console.log(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > token.exp) {
        // storageService.removeAccessToken();
        storageService.setAccessToken("");
        // dispatch(setIsLogin(false));
        storageService.removeRole();
        // dispatch(setRole(""));
        dispatch(setIsLogin(false));
        dispatch(setAccId(null));
        dispatch(setCurrentUser(null));
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
    dispatch(getAllBuilding());
  }, []);

  useEffect(() => {
    dispatch(getAccountDetail(id));
  }, [id]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/apartments" element={<AllApartment />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
        </Route>
        {/* Route for ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectRole role={role} allowedRoles={["ADMIN"]}>
              <AdminLayout />
            </ProtectRole>
          }
        >
          <Route index element={<Navigate to="/admin/manage_account" />} />
          <Route path="/admin/manage_account" element={<Account />} />
          <Route path="/admin/transactions" element={<TransactionsPage />} />
        </Route>
        {/* Route for INVESTOR */}
        <Route
          path="/investor"
          element={
            <ProtectRole role={role} allowedRoles={["INVESTOR"]}>
              <InvestorLayout />
            </ProtectRole>
          }
        >
          <Route index element={<Navigate to="/investor/project" />} />
          <Route path="/investor/project" element={<InvestorProject />} />
          <Route path="/investor/info/" element={<AccountInfo />} />
          <Route
            path="/investor/project/:projectId"
            element={<InvestorApartment />}
          />
        </Route>
        {/* Route for AGENCY */}
        <Route
          path="/agency"
          element={
            <ProtectRole role={role} allowedRoles={["AGENCY"]}>
              <AgencyLayout />
            </ProtectRole>
          }
        >
          <Route index element={<Navigate to="/agency/own" />} />
          <Route path="/agency/own" element={<AgencyApartment />} />
          <Route path="/agency/own/booking" element={<Booking />} />
          <Route path="/agency/info/" element={<AccountInfo />} />
          <Route path="/agency/article" element={<Article />} />
          <Route path="/agency/contract" element={<Contract />} />
          <Route
            path="/agency/appointment/apartment/:apartmentId"
            element={<Subcription />}
          />
          <Route
            path="/agency/available_apartment"
            element={<AvailableApartment />}
          />
        </Route>
        {/* Route for CUSTOMER */}
        <Route
          path="/customer"
          element={
            <ProtectRole role={role} allowedRoles={["CUSTOMER"]}>
              <CustomerLayout />
            </ProtectRole>
          }
        >
          <Route
            index
            element={<Navigate to="/customer/booking_apartment" />}
          />
          <Route
            path="/customer/booking_apartment"
            element={<BookingApartment />}
          />
          <Route path="/customer/info/" element={<AccountInfo />} />
        </Route>
        <Route
          path="/login"
          element={
            <Protected isAccess={isLogin}>
              <LoginPage />
            </Protected>
          }
        />
        <Route
          path="/register"
          element={
            <Protected isAccess={isLogin}>
              <RegisterPage />
            </Protected>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
      {/* <Route path="*">
      </Route> */}
    </BrowserRouter>
  );
}

export default App;
