import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPassword from "./ForgotPassword";
import VerifyCode from "./VerifyCode";
import SetNewPassword from "./SetNewPassword";
import Dashboard from "./Dashboard";
import AccountSettings from "./AccountSettings";
import HelpPage from "./HelpPage";
import ReportAProblem from "./ReportAProblem";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/forgotpassword/verifycode" element={<VerifyCode />} />
        <Route path="/forgotpassword/verifycode/setnewpassword" element={<SetNewPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/accountsettings" element={<AccountSettings />} />
        <Route path="/dashboard/HelpPage" element={<HelpPage />} />
        <Route path="/dashboard/ReportAProblem" element={<ReportAProblem />} />
      </Routes>
  );
}

export default App;
