import image from "../../assets/svg/signInImg.svg";
import { Link as RouterLink } from "react-router-dom";
function WelcomeBack() {
  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      <div className="text-center self-end z-10 mr-15 mt-15 mb-8 text-[#B28FFA] font-extrabold">
        <h1 className="text-5xl mb-5">Welcome Back!</h1>
        <h2 className="text-2xl">Don’t have an account?</h2>
        <RouterLink to="/signup">
          <button className="bg-[#B28FFA] self-center text-2xl text-black rounded-sm py-3 px-20 font-extrabold mt-2  transition-transform hover:scale-105 duration-300 cursor-pointer">
            SignUp
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

export default WelcomeBack;
