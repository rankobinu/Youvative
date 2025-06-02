import AboutUs from "./AboutUs.jsx";
import HeroSection from "./HeroSection.jsx";
import PricingPlans from "./PricingPlans.jsx";
import Services from "./Services.jsx";
import Testimonials from "./Testimonials.jsx";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { Element } from "react-scroll";
import { useEffect } from "react";
import { setPageTitle } from "../../utils/pageTitle";

function HomePage() {
  useEffect(() => {
    setPageTitle("Home");
  }, []);
  return (
    <div className="bg-[#29104A] w-full min-h-screen absolute -z-[10] ">
      <div className="grid grid-cols-4 gap-[2rem] relative z-[-1] opacity-100 mix-blend-normal ">
        <svg
          className=" absolute"
          width="984"
          height="892"
          viewBox="0 0 984 892"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_24_177)">
            <circle cx="153" cy="61" r="320" fill="#1D86AE" fillOpacity="0.6" />
          </g>
          <defs>
            <filter
              id="filter0_f_24_177"
              x="-678"
              y="-770"
              width="1662"
              height="1662"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="150"
                result="effect1_foregroundBlur_24_177"
              />
            </filter>
          </defs>
        </svg>

        <svg
          className="top-[-100px] absolute  opacity-100"
          width="100%"
          height="1814"
          viewBox="0 0 1000 1814"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_24_176)">
            <circle
              cx="1150"
              cy="907"
              r="320"
              fill="#E7BFE1"
              fillOpacity="0.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_24_176"
              x="0"
              y="0"
              width="2000"
              height="1814"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="160"
                result="effect1_foregroundBlur_24_176"
              />
            </filter>
          </defs>
        </svg>

        <svg
          className="absolute top-[580px] opacity-100"
          width="895"
          height="1814"
          viewBox="0 0 895 1814"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_28_204)">
            <circle
              cx="-12"
              cy="907"
              r="320"
              fill="#E7BFE1"
              fillOpacity="0.45"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_28_204"
              x="-919"
              y="0"
              width="1814"
              height="1814"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="160"
                result="effect1_foregroundBlur_28_204"
              />
            </filter>
          </defs>
        </svg>

        <svg
          className="absolute top-[1040px] opacity-100"
          width="100%"
          height="1814"
          viewBox="0 0 895 1814"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_28_205)">
            <circle
              cx="1150"
              cy="831"
              r="320"
              fill="#1D86AE"
              fillOpacity="0.6"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_28_205"
              x="0"
              y="0"
              width="1814"
              height="1814"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="150"
                result="effect1_foregroundBlur_28_205"
              />
            </filter>
          </defs>
        </svg>

        <svg
          className="absolute top-[1950px] opacity-100"
          width="100%"
          height="1678"
          viewBox="0 0 100% 1678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_44_68)">
            <ellipse
              cx="1100"
              cy="839"
              rx="170"
              ry="250"
              fill="#E7BFE1"
              fill-opacity="0.4"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_44_68"
              x="0"
              y="0"
              width="1607"
              height="1678"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="160"
                result="effect1_foregroundBlur_44_68"
              />
            </filter>
          </defs>
        </svg>

        <svg
          className="absolute top-[1950px] opacity-100"
          width="100%"
          height="1662"
          viewBox="0 0 100% 1662"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_44_67)">
            <circle
              cx="650"
              cy="831"
              r="320"
              fill="#1D86AE"
              fill-opacity="0.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_44_67"
              x="-111"
              y="0"
              width="1662"
              height="1662"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="150"
                result="effect1_foregroundBlur_44_67"
              />
            </filter>
          </defs>
        </svg>

        <svg
          className="absolute top-[1950px] opacity-100"
          width="100%"
          height="1678"
          viewBox="0 0 100% 1678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_44_69)">
            <ellipse
              cx="240"
              cy="839"
              rx="170"
              ry="250"
              fill="#E7BFE1"
              fill-opacity="0.3"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_44_69"
              x="-570"
              y="0"
              width="1607"
              height="1678"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="160"
                result="effect1_foregroundBlur_44_69"
              />
            </filter>
          </defs>
        </svg>

        <svg
          className="max-h-[100%] absolute top-[3210px] opacity-100"
          width="100%"
          height="810"
          viewBox="0 0 100% 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_51_96)">
            <circle
              cx="223"
              cy="405"
              r="137"
              fill="#E7BFE1"
              fill-opacity="0.7"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_51_96"
              x="-181.752"
              y="0.247559"
              width="809.505"
              height="809.505"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="133.876"
                result="effect1_foregroundBlur_51_96"
              />
            </filter>
          </defs>
        </svg>

        <svg
          className="max-h-[100%] absolute top-[2860px] opacity-2000"
          width="100%"
          height="1662"
          viewBox="0 0 100% 1662"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_51_106)">
            <circle
              cx="690"
              cy="831"
              r="320"
              fill="#1D86AE"
              fill-opacity="0.5"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_51_106"
              x="-110"
              y="0"
              width="1662"
              height="1662"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="150"
                result="effect1_foregroundBlur_51_106"
              />
            </filter>
          </defs>
        </svg>

        <svg
          className="max-h-[100%] absolute top-[3510px] opacity-2000"
          width="100%"
          height="810"
          viewBox="0 0 100% 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_51_98)">
            <circle
              cx="1100"
              cy="405"
              r="137"
              fill="#E7BFE1"
              fill-opacity="0.7"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_51_98"
              x="600"
              y="0.247559"
              width="809.505"
              height="809.505"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="133.876"
                result="effect1_foregroundBlur_51_98"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <Navbar />
      <Element name="home" id="home">
        <HeroSection />
      </Element>
      <Element name="about" id="about">
        <AboutUs />
      </Element>

      <Element name="testimonials" id="testimonials">
        <Testimonials />
      </Element>
      <Element name="offre" id="offre">
        <PricingPlans />
      </Element>
      <Element name="our-work" id="our-work">
        <Services />
      </Element>

      <Footer />
    </div>
  );
}
export default HomePage;
