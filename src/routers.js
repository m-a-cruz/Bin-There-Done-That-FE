import {
  createBrowserRouter,
} from 'react-router-dom';
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPassword from "./ForgotPassword";
import VerifyCode from "./VerifyCode";
import SetNewPassword from "./SetNewPassword";
import Dashboard from "./Dashboard";
import AccountSettings from "./AccountSettings";
import HelpPage from "./HelpPage";
import ReportAProblem from "./ReportAProblem";
import App from "./App";
import NotFound from './NotFound';
import AuthWrapper from "./AuthWrapper"; // Import AuthWrapper

const routers = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/bin-there-done-that/login",
        element: <LoginPage />,
      },
      {
        path: "/bin-there-done-that/register",
        element: <RegisterPage />,
      },
      {
        path: "/bin-there-done-that/forgotpassword",
        element: <ForgotPassword />,
        children: [
          {
            path: "/bin-there-done-that/forgotpassword/verifycode",
            element: <VerifyCode />,
          },
          {
            path: "/bin-there-done-that/forgotpassword/setnewpassword",
            element: <SetNewPassword />,
          },
        ],
      },
      {
        path: "/bin-there-done-that/dashboard",
        element: (
          <AuthWrapper>
            <Dashboard />
          </AuthWrapper>
        ),
        children: [
          {
            path: "/bin-there-done-that/dashboard/accountsettings",
            element: (
              <AuthWrapper>
                <AccountSettings />
              </AuthWrapper>
            ),
          },
          {
            path: "/bin-there-done-that/dashboard/HelpPage",
            element: (
              <AuthWrapper>
                <HelpPage />
              </AuthWrapper>
            ),
          },
          {
            path: "/bin-there-done-that/dashboard/ReportAProblem",
            element: (
              <AuthWrapper>
                <ReportAProblem />
              </AuthWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routers;
