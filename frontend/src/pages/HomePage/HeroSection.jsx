import { Link } from "react-scroll";
import firstImage from "../../assets/svg/first_3D.svg";
import starIcon from "../../assets/svg/star_icon.svg";
import videocamIcon from "../../assets/svg/videocam_icon.svg";
function HeroSection() {
  return (
    <div
      id="home"
      className="flex justify-between items-center mx-[78px] my-45"
    >
      <div className="flex flex-col justify-center">
        <div className="grid grid-rows-3 gap-3.5 tracking-normal text-white font-extrabold text-6xl">
          <h1>For Visionaries Creators </h1>
          <h1>Build Your Brand</h1>
          <h1>Own the Digital Space</h1>
        </div>
        <div className="my-10 max-w-[63%] leading-8 font-normal text-[#B3B3B3]">
          <p>
            A powerful content creation ecosystem built to transform ideas into
            engaging, high-performing content.
          </p>
        </div>
        <div className="flex justify-between max-w-[53%] font-bold">
          <div className="p-[2px] bg-gradient-to-r from-[#5614D2] to-[#3C4649] hove:from-[#5614D2] hover:to-[#198FAB] transition-transform hover:scale-105 duration-300 rounded-full">
            <button className="h-12 w-40 flex justify-center items-center bg-gradient-to-t from-[#4A4452] to-[#5F16E9] rounded-full cursor-pointer">
              <img className="max-h-4 mr-3" src={starIcon} alt="Star Icon" />
              <Link
                to="offre"
                className="bg-gradient-to-r from-[#FFE2DA] to-[#814F6A] bg-clip-text text-transparent"
              >
                Explore Offre
              </Link>
            </button>
          </div>
          <div className="p-[2px] bg-gradient-to-r from-[#5614D2] to-[#3C4649] hove:from-[#5614D2] hover:to-[#198FAB] transition-transform hover:scale-105 duration-300 rounded-full">
            <button className="h-12 w-40 flex justify-center items-center bg-gradient-to-t from-[#4A4452] to-[#5F16E9] rounded-full cursor-pointer">
              <img
                className="max-h-4 mr-3"
                src={videocamIcon}
                alt="Star Icon"
              />
              <a className="bg-gradient-to-r from-[#FFE2DA] to-[#814F6A] bg-clip-text text-transparent">
                Watch Guide
              </a>
            </button>
          </div>
        </div>
      </div>

      <img className="max-h-100 " src={firstImage} alt="3D Image" />
    </div>
  );
}
export default HeroSection;
