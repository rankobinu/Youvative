import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

function MobileMenu({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className="text-white p-2 focus:outline-none"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#29104A] bg-opacity-95 flex flex-col">
          <div className="flex justify-end p-4">
            <button
              onClick={closeMenu}
              className="text-white p-2 focus:outline-none"
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center space-y-6 mt-10 px-4">
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              offset={-100}
              onClick={closeMenu}
              className={`text-xl ${
                activeSection === "home"
                  ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text font-bold"
                  : "text-white"
              }`}
            >
              Home
            </ScrollLink>

            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              offset={-100}
              onClick={closeMenu}
              className={`text-xl ${
                activeSection === "about"
                  ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text font-bold"
                  : "text-white"
              }`}
            >
              About
            </ScrollLink>

            <ScrollLink
              to="testimonials"
              smooth={true}
              duration={500}
              offset={-100}
              onClick={closeMenu}
              className={`text-xl ${
                activeSection === "testimonials"
                  ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text font-bold"
                  : "text-white"
              }`}
            >
              Testimonials
            </ScrollLink>

            <ScrollLink
              to="offre"
              smooth={true}
              duration={500}
              offset={-100}
              onClick={closeMenu}
              className={`text-xl ${
                activeSection === "offre"
                  ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text font-bold"
                  : "text-white"
              }`}
            >
              Offre
            </ScrollLink>

            <ScrollLink
              to="our-work"
              smooth={true}
              duration={500}
              offset={100}
              onClick={closeMenu}
              className={`text-xl ${
                activeSection === "our-work"
                  ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text font-bold"
                  : "text-white"
              }`}
            >
              Our Work
            </ScrollLink>

            <div className="flex flex-col space-y-4 mt-6 w-full items-center">
              <RouterLink
                to="/login"
                className="text-white text-xl hover:text-[#8E98A8] transition-colors duration-300"
                onClick={closeMenu}
              >
                Login
              </RouterLink>

              <RouterLink
                to="/signup"
                onClick={closeMenu}
                className="bg-gradient-to-r from-[#5614D2] to-[#292531] hover:from-[#5614D2] hover:to-[#E9EBF8] p-[1px] rounded-md w-40 text-center"
              >
                <div className="bg-gradient-to-t from-[#443F4E] to-[#210852] rounded-md py-2 px-4">
                  <span className="bg-gradient-to-r from-[#FFFFFF] to-[#7B7B7B] bg-clip-text text-transparent text-xl">
                    Sign Up
                  </span>
                </div>
              </RouterLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
