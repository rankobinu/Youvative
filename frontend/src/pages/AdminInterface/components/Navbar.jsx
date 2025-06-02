import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import logoBlack from "../../../assets/svg/logo.svg";

function Navbar({ handleSignOut, showDropdown, setShowDropdown }) {
  return (
    <div className="h-16 bg-white/10 backdrop-blur-md flex items-center justify-between px-6 border-b border-white/10 z-50">
      <img src={logoBlack} alt="Logo" className="h-8 cursor-pointer" />

      <div className="relative user-dropdown z-50">
        <button
          className="flex items-center text-white hover:text-[#5D17E9] transition-colors cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
        >
          <FiUser size={24} className="cursor-pointer" />
          <span className="mx-2">Admin</span>
          <FiChevronDown
            size={16}
            className={`transition-transform duration-200 cursor-pointer ${showDropdown ? "rotate-180" : ""}`}
          />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#1F0B38] ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu">
              <button
                className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-[#5D17E9]/20 transition-colors cursor-pointer"
                onClick={() => {
                  handleSignOut();
                  setShowDropdown(false);
                }}
              >
                <FiLogOut className="mr-2" size={16} />
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
