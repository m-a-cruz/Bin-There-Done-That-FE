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
  
  const routers = createBrowserRouter([
  
    {
      path: '/',
      element: <App/>,
      children: [
        {
            path: "/",
            element: <LoginPage />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            {
                path: "/dashboard/accountsettings",
                element: <AccountSettings />,
              },
              {
                path: "/dashboard/HelpPage",
                element: <HelpPage />,
              },
              {
                path: "/dashboard/ReportAProblem",
                element: <ReportAProblem />,
              },
          ]
        },
        {
            path: "/login",
            element: <LoginPage />,
        },
        {
            path: "/register",
            element: <RegisterPage />,
        },
        {
            path: "/forgotpassword",
            element: <ForgotPassword />,
            children: [
                {
                    path: "/forgotpassword/verifycode",
                    element: <VerifyCode />,
                    children: [
                        {
                            path: "/forgotpassword/verifycode/setnewpassword",
                            element: <SetNewPassword />,
                        },
                    ],
                },
            ],
        },
      ]
    },
    
    {
        path: '*',
        element: <NotFound/>,
    },
    
  ])
export default routers;