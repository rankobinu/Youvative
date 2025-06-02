import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import logo from "../../../assets/svg/logoBlack.svg";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaEnvelope,
  FaExclamationCircle,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";
import { MdTaskAlt } from "react-icons/md";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  updateSignUpData,
  nextStep,
} from "../../../store/slices/registerSlice";

function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedUserName = localStorage.getItem("userName");
    if (savedEmail) setEmail(savedEmail);
    if (savedUserName) setUsername(savedUserName);
  }, []);

  const validateForm = () => {
    let tempErrors = {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    };
    let isValid = true;

    if (!username) {
      tempErrors.username = "Name is required";
      isValid = false;
    } else if (/[./%]/.test(username)) {
      tempErrors.username = `Name cannot contain special characters like ".", "/", "%" etc.`;
      isValid = false;
    }

    if (!email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (confirmPassword !== password) {
      tempErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegistrationError("");

    if (validateForm()) {
      try {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userName", username);

        // Update sign up data in Redux store
        dispatch(updateSignUpData({ email, username, password }));

        // Move to next step
        dispatch(nextStep());

        // Navigate to form page
        navigate("/form");
      } catch (error) {
        console.error("Error during sign up:", error);
        setRegistrationError(
          error.message || "Registration failed. Please try again.",
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto px-4">
      <RouterLink to="/homepage">
        <img src={logo} alt="Youvative Logo" className="-mt-7 -ml-10" />
      </RouterLink>
      <form onSubmit={handleSubmit}>
        <div className="mx-40 -mt-20">
          <div className="text-center">
            <div className="flex justify-center items-center gap-6 mx-auto">
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
            </div>
            <h1 className="text-[#5E15EB] text-4xl font-extrabold mb-6">
              Create Account
            </h1>

            {/* Full Name */}
            <div className="mt-2 my-2">
              <div
                className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-13 text-lg rounded-md ${errors.username ? "border border-red-500" : ""}`}
              >
                <span className="self-center text-white">
                  <FaUser />
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type="text"
                  placeholder="Full Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {errors.userName && (
                <div className="text-red-500 text-left text-sm flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.userName}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="mb-2">
              <div
                className={`flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md ${errors.email ? "border border-red-500" : ""}`}
              >
                <span className="self-center text-white">
                  <FaEnvelope />
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <div className="text-red-500 text-left text-sm flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="my-2">
              <div
                className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-13 text-lg rounded-md ${errors.password ? "border border-red-500" : ""}`}
              >
                <span className="self-center text-white">
                  <FaLock />
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="self-center text-white"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-500 text-left text-sm flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="my-2">
              <div
                className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-13 text-lg rounded-md ${errors.confirmPassword ? "border border-red-500" : ""}`}
              >
                <span className="self-center text-white">
                  <FaArrowRight />
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type={show ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="self-center text-white"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="text-red-500 text-left text-sm flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* Registration Error */}
            {registrationError && (
              <div className="text-red-600 mt-2 text-sm">
                {registrationError}
              </div>
            )}

            <p className="text-[#9B9B9B] hover:text-[#FFFFFF] transition-colors duration-300 mt-4">
              <RouterLink to="/login">
                Already have an account? Log in
              </RouterLink>
            </p>

            <button
              type="submit"
              className="bg-[#5D17E9] text-white text-xl rounded-lg py-3 px-16 font-bold transition-all duration-300 hover:bg-[#4A12BA] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
