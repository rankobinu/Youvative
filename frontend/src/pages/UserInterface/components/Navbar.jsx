import { FiLogOut, FiChevronDown } from "react-icons/fi";
import logoBlack from "../../../assets/svg/logo.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import userService from "../../../services/userService";

function Navbar({
  setActiveTab,
  handleSignOut,
  showDropdown,
  setShowDropdown,
}) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ userName: "", avatar: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const basicInfo = await userService.getUserBasicInfo();
        setUserData({
          userName: basicInfo.userName || "User",
          avatar:
            basicInfo.avatar ||
            "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback",
        });
      } catch (error) {
        console.error("Error fetching user data for navbar:", error);
        // Use fallback avatar if fetch fails
        setUserData({
          userName: "User",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="h-16 bg-white/10 backdrop-blur-md flex items-center justify-between px-6 border-b border-white/10">
      <img src={logoBlack} alt="Logo" className="h-8 cursor-pointer" />

      {/* User Dropdown */}
      <div className="relative user-dropdown z-50">
        <button
          className="flex items-center text-white hover:text-[#5D17E9] transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
        >
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-white/30 animate-pulse"></div>
          ) : (
            <img
              src={userData.avatar}
              alt={userData.userName}
              className="w-8 h-8 rounded-full border-2 border-white/30 cursor-pointer object-cover"
            />
          )}
          <FiChevronDown
            size={16}
            className={`ml-1 transition-transform duration-200 cursor-pointer ${showDropdown ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1F0B38] ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu">
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#5D17E9]/20 transition-colors cursor-pointer"
                onClick={() => {
                  setActiveTab("profile");
                  setShowDropdown(false);
                }}
              >
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-4 h-4 rounded-full mr-2"
                />
                Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#5D17E9]/20 transition-colors cursor-pointer"
                onClick={() => {
                  handleSignOut();
                  setShowDropdown(false);
                }}
              >
                <FiLogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
