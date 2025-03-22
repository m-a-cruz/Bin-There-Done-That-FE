import { useNavigate } from "react-router-dom";

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-300 p-4 flex justify-between items-center">
        <img 
          src="/BINLOGO.png" 
          alt="Logo" 
          className="h-8 cursor-pointer" 
          onClick={() => navigate("/bin-there-done-that/dashboard")} 
        />
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-1/5 bg-white p-6 min-h-screen border-r">
          <button 
            onClick={() => navigate("/bin-there-done-that/dashboard")}
            className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100"
          >
            ⬅ Back
          </button>
          <button 
            onClick={() => navigate("/bin-there-done-that/dashboard/accountsettings")} 
            className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 "
          >
            ⚙ Account Settings
          </button>
        
          <button   onClick={() => navigate("/bin-there-done-that/dashboard/HelpPage")} className="w-full text-left flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-100">
            ❓ Help
          </button>
        
          <button 
            onClick={() => navigate("/bin-there-done-that/dashboard/ReportAProblem")} className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100">
            ⚠ Report a Problem
          </button>
        </div>

        {/* Help Content */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-4">Help Center</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600">
              Welcome to the Help Center. Find answers to common questions and troubleshooting tips below.
            </p>

            {/* Example FAQs */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
              <ul className="mt-2 list-disc pl-6 text-gray-700">
                <li>How do I change my password?</li>
                <li>How do I update my profile picture?</li>
                <li>Where can I report a bug?</li>
                <li>How do I contact support?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
