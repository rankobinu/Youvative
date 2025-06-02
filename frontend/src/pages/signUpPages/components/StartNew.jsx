import { Link as RouterLink } from "react-router-dom";
import image from "../../../assets/svg/signInImg.svg";

function StartNew() {
  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="text-center self-end z-10 mr-15 mt-15 mb-8 text-[#B28FFA] font-extrabold">
        <h1 className="text-5xl mb-5">Start New Journey!</h1>
        <h2 className="text-2xl">Already have an account?</h2>
        <RouterLink to="/login">
          <button className="bg-[#B28FFA] self-center text-2xl text-black rounded-sm py-3 px-20 font-extrabold mt-2 transition-transform hover:scale-105 duration-300 cursor-pointer">
            Login
          </button>
        </RouterLink>
      </div>
      <img
        className="w-full object-contain max-h-[90vh] absolute bottom-0 left-0"
        src={image}
        alt="3D Image"
      />
    </div>
  );
}

export default StartNew;
