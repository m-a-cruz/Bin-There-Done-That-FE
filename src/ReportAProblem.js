import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ReportaProblem() {
  const navigate = useNavigate();
  const [problemDescription, setProblemDescription] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setScreenshot(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Problem Submitted:", problemDescription, screenshot);
    alert("Your report has been submitted!");
    setProblemDescription("");
    setScreenshot(null);
  };

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
            className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100"
          >
            ⚙ Account Settings
          </button>
          <button 
            onClick={() => navigate("/bin-there-done-that/dashboard/HelpPage")} 
            className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100"
          >
            ❓ Help
          </button>
          <button className="w-full text-left flex items-center px-4 py-2 bg-gray-200">
            ⚠ Report a Problem
          </button>
        </div>

        {/* Report a Problem Content */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-4">Report a Problem</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Describe the Problem
                </label>
                <textarea
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full p-3 border rounded-lg resize-none"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Attach Screenshot (if applicable)
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange} 
                  className="border rounded p-2"
                />
              </div>

              <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
