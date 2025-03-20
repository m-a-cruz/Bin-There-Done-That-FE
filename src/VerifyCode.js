import React from "react";
import { useNavigate } from "react-router-dom";

export default function VerifyCode() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <div className="w-[400px]">
          {/* Logo */}
          <div className="absolute top-6 left-6 flex items-center space-x-2">
            <img src="/BINLOGO.png" className="w-10 h-10" alt="Bin Logo" />
            <h1 className="text-green-700 font-bold text-sm">  Bin There, <br /> Done That! </h1>
          </div>

          {/* Verification  */}
          <h2 className="text-2xl font-semibold mb-2">Verify code</h2>
          <p className="text-gray-500 mb-6"> An authentication code has been sent to your email. </p>

          <div className="mb-4">
            <label className="block text-gray-700">Enter Code</label>
            <input type="text" placeholder="D6372K" className="w-full p-3 border rounded-md bg-gray-100"/>
          </div>

          <p className="text-sm text-gray-600">  Didn’t receive a code?{" "}  <span className="text-blue-600 cursor-pointer">Resend</span> </p>

          <button className="w-full bg-green-600 text-white py-3 rounded-md mt-4"onClick={() => navigate("/bin-there-done-that/forgotpassword/setnewpassword")}> Verify </button>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center bg-gray-200">
        <img src="/Forgotimg.png" alt="Illustration" className="w-3/4" />
      </div>
    </div>
  );
}

