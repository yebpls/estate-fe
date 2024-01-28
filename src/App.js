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

  const fetch = async () => {
    try {
      const res = await accountApi.test();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
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
