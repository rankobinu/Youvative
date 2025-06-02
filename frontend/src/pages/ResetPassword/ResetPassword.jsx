import { useState, useEffect } from "react";
import { setPageTitle } from "../../utils/pageTitle";
import { Link as RouterLink } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import logo from "../../assets/svg/logoBlack.svg";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setPageTitle("Reset Password");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-t from-[#5E4683] to-[#150F1D] w-full h-screen overflow-hidden flex flex-col items-center justify-center">
      <div className="self-start justify-start">
        <RouterLink to="/homepage">
          <img src={logo} alt="Youvative Logo" className=" -mt-25" />
        </RouterLink>
      </div>
      <div className="bg-white/10 backdrop-blur-md px-10 py-6 rounded-lg max-w-lg w-full shadow-lg border border-white/10">
        <h1 className="text-4xl text-[#5E15EB] font-extrabold mb-6 text-center">
          Reset Your Password
        </h1>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">
                Email Address
              </label>
              <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-15 rounded-md">
                <span className="self-center">
                  <FaEnvelope />
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center text-black outline-none"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="bg-[#5D17E9] min-w-[50%] text-xl text-black rounded-sm py-3 font-extrabold transition-transform hover:scale-105 duration-300 cursor-pointer"
              >
                Send Reset Link
              </button>
            </div>

            <div className="mt-6 text-center">
              <RouterLink
                to="/login"
                className="text-[#9B9B9B] hover:text-white transition-colors duration-300"
              >
                Back to Login
              </RouterLink>
            </div>
          </form>
        ) : (
          <div className="text-center text-white">
            <div className="bg-green-500/20 p-4 rounded-md mb-6">
              <p className="mb-4">
                If an account exists with the email{" "}
                <span className="font-semibold">{email}</span>, we've sent
                instructions to reset your password.
              </p>
              <p>Please check your inbox.</p>
            </div>

            <RouterLink to="/login">
              <button className="bg-[#5D17E9] text-xl text-black rounded-sm py-3 px-8 font-bold mt-4 transition-transform hover:scale-105 duration-300 cursor-pointer">
                Back to Login
              </button>
            </RouterLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
