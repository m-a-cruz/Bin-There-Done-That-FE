import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, X, AlertTriangle, Settings, HelpCircle } from "lucide-react";
import axios from "axios";

// Reusable InfoCard Component
const InfoCard = memo(({ url, title, onClick  }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center border border-gray-300 h-[200px] cursor-pointer"
    onClick={onClick}  aria-label={`Info card: ${title}`}
  >
    <iframe src={url} className="w-full h-full rounded-lg pointer-events-none" loading="lazy" title={title}></iframe>
    {/* <p className="text-6xl font-bold text-blue-600">{title}</p>
    <span className="text-2xl text-gray-500">{subtitle}</span> */}
  </div>
));

// Reusable ChartCard Component
const ChartCard = memo(({ url, height, title, onClick }) => (
  <div
    className={`bg-white p-6 rounded-lg shadow-lg border border-gray-300 cursor-pointer ${height}`}
    onClick={onClick} aria-label={`Chart card: ${title}`}
  >
    <iframe src={url} className="w-full h-full rounded-lg pointer-events-none" 
    loading="lazy" title={title}></iframe>
  </div>
));

// Main Dashboard Component
export default function Dashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [chartData, setChartData] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState("/avatar1.jpg");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch data and initialize state
  useEffect(() => {
    const storedAvatar = localStorage.getItem("selectedAvatar");
    if (storedAvatar) setSelectedAvatar(storedAvatar);
    
    const fetchCharts = async () => {
      try {
        const response = await axios.get(`${API_URL}/gas/charts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching charts:", error);
        alert("Failed to load chart data. Please try again later.");
      }
    };
    fetchCharts();
  }, []);


  const openModal = (url) => {
    setModalContent(url);
    setModalOpen(true);
  };

  const toggleDropdown = (dropdown) => {
    setIsProfileOpen(dropdown === "profile" ? !isProfileOpen : false);
    setIsNotifOpen(dropdown === "notif" ? !isNotifOpen : false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-gray-300 p-4 flex justify-between items-center w-full fixed top-0 left-0">
        <img
          src="/logoyan.png"
          alt="Bin Logo"
          className="h-10 w-auto cursor-pointer object-contain"
        />

        <div className="flex items-center space-x-9 relative">
          {/* Notification Icon */}
          <div className="relative">
            <Bell className="text-black cursor-pointer" size={28} onClick={() => toggleDropdown("notif")} aria-label="Toggle notifications"/>
            {isNotifOpen && (
              <div className="absolute right-0 mt-3 w-96 bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-50">
                <h2 className="text-center text-lg font-semibold mb-3">
                  Notification
                </h2>
                <div className="space-y-3 max-h-80 overflow-auto">
                  <Notification Icon={Settings} title="System Update" message="We're improving your experience! A system update is scheduled for March 21."/>
                  <Notification Icon={AlertTriangle} title="Alert Notification" message="High gas concentration detected. Immediate action required!"/>
                </div>
              </div>
            )}
          </div>

          {/* Profile Icon */}
          <div className="relative">
            <img src={selectedAvatar} alt="Profile" className="h-10 w-10 rounded-full cursor-pointer border" onClick={() => toggleDropdown("profile")} aria-label="Open profile settings"/>
            {isProfileOpen && (
              <DropdownMenu selectedAvatar={selectedAvatar} onLogout={handleLogout} onNavigate={navigate}/>
            )}
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="grid grid-cols-3 gap-6 mt-20">
        
        {/* Left Column */}
        <div className="col-span-1 space-y-3">
          {chartData.filter((chart) => chart.title === "highestDaily").map((chart) => (
            <InfoCard title="Sample" key={chart._id} url={chart.link} onClick={() => openModal(chart.link)} />
          ))}
          {chartData.filter((chart) => chart.title === "highestGasLevel").map((chart) => (
            <InfoCard title="Carbon Dioxide" key={chart._id} url={chart.link} onClick={() => openModal(chart.link)} />
          ))}
          {chartData.filter((chart) => chart.title === "percentage").map((chart) => (
              <ChartCard key={chart._id} url={chart.link} height="h-[400px]" title="Pie Chart" 
              onClick={() => openModal(chart.link)} />
            ))}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {chartData.filter((chart) =>chart.title === "gasType" || chart.title === "avgPerHour" ).map((chart) => (
              <ChartCard key={chart._id} url={chart.link} height="h-[400px]" title={chart.title} onClick={() => openModal(chart.link)} />
            ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-5">
        <div className="col-span-2 space-y-6">
          {chartData.filter((chart) =>chart.title === "dailyAvg").map((chart) => (
              <ChartCard key={chart._id} url={chart.link} height="h-[400px]" title={chart.title} onClick={() => openModal(chart.link)} />
            ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => setModalOpen(false)} aria-label="Close modal">
          <div className="bg-white rounded-lg p-6 w-[90vw] h-[90vh] shadow-lg border border-gray-300 relative flex flex-col items-center" onClick={(e) => e.stopPropagation()} >
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setModalOpen(false)} >
              <X size={20} />
            </button>
            <iframe src={modalContent} className="w-full h-full rounded-lg" loading="lazy" title="Chart"></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

const Notification = ({ Icon, title, message }) => (
  <div className="flex items-start space-x-3 p-2 border-b">
    <Icon className="text-gray-500" size={24} />
    <div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  </div>
);

const DropdownMenu = ({ selectedAvatar, onLogout, onNavigate }) => (
  <div className="absolute right-0 mt-3 w-64 bg-white shadow-lg rounded-lg p-4 border border-gray-300 z-50">
    <div className="text-center">
      <img src={selectedAvatar} alt="Profile" className="h-12 w-12 rounded-full mx-auto border" />
      <h2 className="text-lg font-semibold mt-2">Admin</h2>
      <p className="text-gray-500 text-sm">Admin@ncf.edu.ph</p>
      <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs mt-1 inline-block">
        Navigator Midlane
      </span>
    </div>
    <div className="mt-4 space-y-2">
      <button className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100" onClick={() => onNavigate("/bin-there-done-that/dashboard/accountsettings")}>
        <Settings className="w-5 h-5 mr-2" /> Account Settings
      </button>
      <button className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100" onClick={() => onNavigate("/bin-there-done-that/dashboard/HelpPage")}>
        <HelpCircle className="w-5 h-5 mr-2" /> Help
      </button>
      <button className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100" onClick={() => onNavigate("/bin-there-done-that/dashboard/ReportAProblem")}>
        <AlertTriangle className="w-5 h-5 mr-2" /> Report a Problem
      </button>
    </div>
    <button onClick={onLogout} className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg hover:bg-red-600">
      LOGOUT
    </button>
  </div>
);