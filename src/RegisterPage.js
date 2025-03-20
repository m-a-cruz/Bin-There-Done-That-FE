import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsWarningModal, setShowTermsWarningModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    accessCode: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle checkbox modal
  const handleCheckboxChange = (e) => {
    if (!isChecked) setShowTermsModal(true);
    else setIsChecked(false);
  };

  const handleAgreeTerms = () => {
    setIsChecked(true);
    setShowTermsModal(false);
  };

  const handleDisagreeTerms = () => {
    setIsChecked(false);
    setShowTermsModal(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!newUser.fullName || !newUser.email || !newUser.accessCode || !newUser.password || !newUser.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isChecked) {
      setShowTermsWarningModal(true);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, { name: newUser.fullName, email: newUser.email, accessCode: newUser.accessCode, password: newUser.password, confirmPassword: newUser.confirmPassword } );
      setShowSuccessModal(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setError(error.response.data.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side - Image */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <img src="/Registerimg.png" alt="Register" className="w-3/4" />
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-1/2 flex flex-col justify-center px-16 bg-white relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 right-6 text-gray-600 hover:text-gray-800"
        >
          ← Back to Login
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create your account
        </h1>
        <p className="text-gray-500 mb-6">
          Let's get you set up so you can access your personal account.
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            ⚠️ {error}
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          <input type="text"name="fullName" placeholder="Full Name" value={newUser.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" required/>
          <input type="email" name="email" placeholder="Email"  value={newUser.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" required />
          <input type="text" name="accessCode" placeholder="Access Code" value={newUser.accessCode} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" required />
          <input  type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={newUser.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-lg p-3" required />
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center mt-4">
          <input type="checkbox" id="terms" checked={isChecked}  onChange={handleCheckboxChange} className="mr-2 cursor-pointer" />
          <label htmlFor="terms" className="text-gray-600 text-sm">
            I accept the{" "}
            <span onClick={() => setShowTermsModal(true)} className="text-green-600 cursor-pointer underline"  >
              Terms & Conditions
            </span>
          </label>
        </div>

        {/* Create Account Button */}
        <button onClick={handleSubmit} 
        className={`w-full mt-6 ${ loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700" } text-white py-3 rounded-lg text-lg`} disabled={loading}  > {loading ? "Creating account..." : "Create my account"}
        </button>

        {/* Already Have an Account? */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span onClick={handleSubmit} className="text-green-600 cursor-pointer" >
            Login
          </span>
        </p>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              ✅ Your account has been created!
            </h2>
            <p className="text-gray-600 mt-2">
              Redirecting to Login in 3 seconds...
            </p>
          </div>
        </div>
      )}

      {/* Terms Warning Modal */}
      {showTermsWarningModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-96">
            <h2 className="text-lg font-semibold text-gray-800">
              ⚠️ Terms & Conditions Required
            </h2>
            <p className="text-gray-600 mt-2">
              Please accept the Terms & Conditions to proceed.
            </p>
            <button
              onClick={() => setShowTermsWarningModal(false)}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg text-center w-96">
            <h2 className="text-lg font-semibold text-gray-800">
              📜 Terms & Conditions
            </h2>
            <p className="text-gray-600 mt-2 text-left">
              Welcome to our platform! Please read the following terms
              carefully. By using our services, you agree to abide by these
              terms. We respect your privacy and ensure the security of your
              data.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleAgreeTerms}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
              >
                I Agree
              </button>
              <button
                onClick={handleDisagreeTerms}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                I Disagree
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
