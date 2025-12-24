import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import ProtectedRoute from "./ProtectedRoute";
import routeConfig from "./routeConfig";
import LoginForm from "./components/LoginForm";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";
import ErrorPage from "./components/Error404";
import MenuBar from "./components/menubar/menubar";
import AdministrationLock2 from "./components/lockAdmin2";

function AppContent() {
  const [showHeaderAndMenuBar, setShowHeaderAndMenuBar] = useState((window.location.pathname=='/'? false : true));
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated && window.location.pathname !== "/forgot-password" && window.location.pathname !== "/verify-otp" && window.location.pathname !== "/reset-password") {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {showHeaderAndMenuBar && <Header />}
      {showHeaderAndMenuBar && <MenuBar />}
      <Routes>
        <Route path="/" element={<LoginForm setShowHeaderAndMenuBar={setShowHeaderAndMenuBar} />} />
        <Route path="/forgot-password" element={<ForgotPassword setShowHeaderAndMenuBar={setShowHeaderAndMenuBar} />} />
        <Route path="/verify-otp" element={<VerifyOtp setShowHeaderAndMenuBar={setShowHeaderAndMenuBar} />} />
        <Route path="/reset-password" element={<ResetPassword setShowHeaderAndMenuBar={setShowHeaderAndMenuBar} />} />
        <Route path="/Error" element={<ErrorPage setShowHeaderAndMenuBar={setShowHeaderAndMenuBar} />} />
        <Route path="/access-denied" element={<AdministrationLock2 setShowHeaderAndMenuBar={setShowHeaderAndMenuBar} />} />
        {routeConfig.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute
                element={<route.component setShowHeaderAndMenuBar={setShowHeaderAndMenuBar}/>
                }
                module_name={route.module_name}
                action={route.action}
              />
            }
          />
        ))}
      </Routes>
      <ToastContainer />
    </>
  );
}

function App() {
  return (
        <AppContent />
  );
}

export default App;