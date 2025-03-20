import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AccountSettings() {
  const navigate = useNavigate();

  // Editable Fields
  const [firstName, setFirstName] = useState(() => localStorage.getItem("firstName") || "Kaizuko");
  const [lastName, setLastName] = useState(() => localStorage.getItem("lastName") || "Nami");
  const [email] = useState("Admin@ncf.edu.ph");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Function to save changes
  const handleSave = () => {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    setTimeout(() => {
      window.dispatchEvent(new Event("storage"));
    }, 100); 
  
    alert("Name updated!");
  };

  const Avatars = [
    "/avatar1.jpg",
    "/avatar2.jpg",
    "/avatar3.jpg",
    "/avatar4.jpg",
    "/avatar5.jpg",
    "/avatar6.jpg",
    "/avatar7.jpg",
    "/avatar8.jpg",
    "/avatar9.jpg",
    "/avatar10.jpg",
    "/avatar11.jpg",
    "/avatar12.webp",
    "/avatar13.jpg",
    "/avatar14.webp",
    "/avatar15.jpg",
    "/avatar16.jpg",
    "/avatar17.jpg",
    "/avatar18.webp",
    "/avatar19.jpg",
    "/avatar20.jpg"
  ];


  const [selectedAvatar, setSelectedAvatar] = useState(() => 
    localStorage.getItem("selectedAvatar") || Avatars[0]
  );

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
    localStorage.setItem("selectedAvatar", avatar); 
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-lg border-b border-gray-300 p-4 flex justify-between items-center">
        <img src="/BINLOGO.png" alt="Logo" className="h-8 cursor-pointer" onClick={() => navigate("/bin-there-done-that/dashboard")} />
      </nav>

      <div className="flex">
        {/* sidebar */}
        <div className="w-1/5 bg-white p-6 min-h-screen border-r">
          <button onClick={() => navigate("/bin-there-done-that/dashboard")} className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100">⬅ Back</button>
          <button onClick={() => navigate("/bin-there-done-that/dashboard/accountsettings")} className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100 bg-gray-200">⚙ Account Settings</button>
          <button onClick={() => navigate("/bin-there-done-that/dashboard/HelpPage")} className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100">❓ Help</button>
          <button onClick={() => navigate("/bin-there-done-that/dashboard/ReportaProblem")} className="w-full text-left flex items-center px-4 py-2 hover:bg-gray-100">⚠ Report a Problem</button>
        </div>

        {/* account settings */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            
            {/* avatar Select */}
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Current Avatar</p>
              <div className="flex items-center space-x-4">
             
                <img src={selectedAvatar} alt="Profile" className="h-20 w-20 rounded-full border border-gray-300" />
              </div>

              {/* avatar selection options */}
              <p className="text-sm font-semibold mt-3 mb-3">Change Avatar</p>
              <div className="flex space-x-3 mt-4 overflow-x-auto">
                {Avatars.map((avatar, index) => (
                  <img 
                    key={index} 
                    src={avatar} 
                    alt={`Avatar ${index + 1}`} 
                    className={`h-12 w-12 rounded-full cursor-pointer border-2 ${
                      selectedAvatar === avatar ? "border-blue-500" : "border-transparent"
                    }`}
                    onClick={() => handleAvatarChange(avatar)} 
                  />
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Full Name</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={!isEditingName}
                  className="border p-2 rounded-lg w-1/2"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={!isEditingName}
                  className="border p-2 rounded-lg w-1/2"
                />
                <button
                onClick={() => {
                if (isEditingName) handleSave(); 
                setIsEditingName(!isEditingName);
                 }}
                className="bg-gray-300 px-3 py-2 rounded-lg">
                {isEditingName ? "Save" : "Edit"}
                </button>
                </div>
               </div>

            {/* Email */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Contact Email</p>
              <input type="text" value={email} disabled className="border p-2 rounded-lg w-full" />
            </div>

            {/* Password */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Password</p>
              <div className="flex items-center space-x-2 mb-2">
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={!isEditingPassword}
                  className="border p-2 rounded-lg w-1/2"
                  placeholder="Current Password"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={!isEditingPassword}
                  className="border p-2 rounded-lg w-1/2"
                  placeholder="New Password"
                />
                <button onClick={() => setIsEditingPassword(!isEditingPassword)} className="bg-gray-300 px-3 py-2 rounded-lg">
                  {isEditingPassword ? "Save" : "Edit"}
                </button>
              </div>
            </div>

            {/* Save Button */}
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Save Changes
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
