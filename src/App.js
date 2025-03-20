import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPassword from "./ForgotPassword";
import VerifyCode from "./VerifyCode";
import SetNewPassword from "./SetNewPassword";
import Dashboard from "./Dashboard";
import AccountSettings from "./AccountSettings";
import HelpPage from "./HelpPage";
import ReportAProblem from "./ReportAProblem";
import AuthWrapper from "./AuthWrapper";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/bin-there-done-that/login" element={<LoginPage />} />
      <Route path="/bin-there-done-that/register" element={<RegisterPage />} />
      <Route path="/bin-there-done-that/forgotpassword" element={<ForgotPassword />} />
      <Route path="/bin-there-done-that/forgotpassword/verifycode" element={<VerifyCode />} />
      <Route path="/bin-there-done-that/forgotpassword/setnewpassword" element={<SetNewPassword />} />
      
      {/* Protect the dashboard and its sub-routes */}
      <Route
        path="/bin-there-done-that/dashboard"
        element={
          <AuthWrapper>
            <Dashboard />
          </AuthWrapper>
        }
      />
      <Route
        path="/bin-there-done-that/dashboard/accountsettings"
        element={
          <AuthWrapper>
            <AccountSettings />
          </AuthWrapper>
        }
      />
      <Route
        path="/bin-there-done-that/dashboard/HelpPage"
        element={
          <AuthWrapper>
            <HelpPage />
          </AuthWrapper>
        }
      />
      <Route
        path="/bin-there-done-that/dashboard/ReportAProblem"
        element={
          <AuthWrapper>
            <ReportAProblem />
          </AuthWrapper>
        }
      />
    </Routes>
  );
}

export default App;
