import { useEffect, useState } from "react";
import logo from "../assets/svg/logo.svg";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
      if (isScrolled) {
        setShowTransition(true);
      } else {
        setShowTransition(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const observedElements = document.querySelectorAll("div[id]");
    const observerOptions = {
      root: null,
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    if (window.screenY < 20) {
      setActiveSection("home");
    }
    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    observedElements.forEach((element) => observer.observe(element));
    return () => {
      observedElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div
      className={`sticky top-0 ${showTransition ? "transition-color duration-800" : ""}  ${scrolled ? " backdrop-blur-lg  bg-gray-500/20" : ""} `}
    >
      <div className="grid grid-cols-[26%_1fr_26%] mx-[78px] mt-[63px] gap-15 items-center">
        <div className="flex justify-start">
          <img src={logo} alt="Innovative Logo" className="w-32 h-auto " />
        </div>

        <div className="flex border text-white border-[#50476c] py-1 rounded-full px-0 divide-x divide-[#50476c]">
          <button className="flex-1 px-4 cursor-pointer flex justify-center">
            <ScrollLink to="home" smooth={true} duration={500} offset={-100}>
              <p
                className={` ${activeSection === "home" ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text hover:from-[#FFFFFF] hover:to-[#1A8CAC] transition-colors duration-300 border-b-1 border-blue-400" : "transition-colors duration-300 hover:text-[#8E98A8] cursor-pointer"}`}
              >
                Home
              </p>
            </ScrollLink>
          </button>

          <button className="flex-1 px-4 cursor-pointer flex justify-center">
            <ScrollLink to="about" smooth={true} duration={500} offset={-100}>
              <p
                className={` ${activeSection === "about" ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text hover:from-[#FFFFFF] hover:to-[#1A8CAC] transition-colors duration-300 border-b-1 border-blue-400" : "transition-colors duration-300 hover:text-[#8E98A8] cursor-pointer"}`}
              >
                About
              </p>
            </ScrollLink>
          </button>

          <button className="flex-1 px-4 cursor-pointer flex justify-center">
            <ScrollLink
              to="testimonials"
              smooth={true}
              duration={500}
              offset={-100}
            >
              <p
                className={` ${activeSection === "testimonials" ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text hover:from-[#FFFFFF] hover:to-[#1A8CAC] transition-colors duration-300 border-b-1 border-blue-400" : "transition-colors duration-300 hover:text-[#8E98A8] cursor-pointer"}`}
              >
                Testimonials
              </p>
            </ScrollLink>
          </button>

          <button className="flex-1 px-4 cursor-pointer flex justify-center">
            <ScrollLink to="offers" smooth={true} duration={500} offset={-100}>
              <p
                className={` ${activeSection === "offers" ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text hover:from-[#FFFFFF] hover:to-[#1A8CAC] transition-colors duration-300 border-b-1 border-blue-400" : "transition-colors duration-300 hover:text-[#8E98A8] cursor-pointer"}`}
              >
                Offers
              </p>
            </ScrollLink>
          </button>

          <button className="flex-1 px-4 cursor-pointer flex justify-center">
            <ScrollLink to="our-work" smooth={true} duration={500} offset={100}>
              <p
                className={` ${activeSection === "our-work" ? "bg-gradient-to-r from-[#1A8CAC] to-[#FFFFFF] text-transparent bg-clip-text hover:from-[#FFFFFF] hover:to-[#1A8CAC] transition-colors duration-300 border-b-1 border-blue-400" : "transition-colors duration-300 hover:text-[#8E98A8] cursor-pointer"}`}
              >
                Our Work
              </p>
            </ScrollLink>
          </button>
        </div>

        <div className="flex justify-end ">
          <button className="mr-2 text-white transition-colors duration-300 hover:text-[#8E98A8] cursor-pointer">
            <RouterLink to="/login">
              <p>Login</p>
            </RouterLink>
          </button>

          <div className="bg-gradient-to-r hover:bg-opacity-80 hover:scale-105 transition-all from-[#5614D2] to-[#292531] p-[1px] rounded-md hover:from-[#5614D2] hover:to-[#E9EBF8]   duration-300">
            <button className="bg-gradient-to-t from-[#443F4E] to-[#210852] rounded-md px-7 border-none cursor-pointer">
              <RouterLink to="/signup">
                <p className="bg-gradient-to-r from-[#FFFFFF] to-[#7B7B7B] bg-clip-text text-transparent">
                  Sign Up
                </p>
              </RouterLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
