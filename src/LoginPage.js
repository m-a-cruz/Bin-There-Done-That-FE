import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`,{email: email, password: password});
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(response.data.name, response.data.email);
      navigate("/bin-there-done-that/dashboard");
    } catch (error) {
      setError(
        error.response.data.error 
      );
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Section - Login Form */}
      <div className="w-1/2 flex flex-col items-center bg-white shadow-lg">
        <div className="w-3/4 flex flex-col justify-center items-center h-100">
          <img src="/logoyan.png" alt="Bin Logo" className="h-32 mb-4 mt-10" />
          <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
            Bin There,
            <br />
            Done That!
          </h1>

          <p className="text-gray-500 text-center mb-4 font-bold">Login to your account</p>

          {/* Display Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Email Input */}
          <div className="w-96 mb-4 relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100"
              required
            />
            <div className="absolute text-gray-700 right-3 top-3 text-gray-500">
            <Mail size={20} />
            </div>
          </div>

          {/* Password Input */}
          <div className="w-96 mb-2 relative ">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full bg-gray-100"
              required
            />
            <div className="absolute text-gray-700 right-3 top-3 text-gray-500">
            <Lock size={20} />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div
            className="w-96 text-right text-sm text-green-600 mb-4 cursor-pointer hover:underline"
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot Password?
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-96 font-bold bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center my-4 w-96">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Register Button */}
          <button
            className="w-96 font-bold border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-100"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </div>

      {/* Right Section - Info / Branding */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-200">
        <img src="/illustration.png" alt="Logo" className="w-full max-w-md mb-5" />
        <p className="text-green-700 text-lg font-bold text-center px-8">
          Monitor and analyze your trash gas toxicity levels efficiently.
        </p>
      </div>
    </div>
  );
}
