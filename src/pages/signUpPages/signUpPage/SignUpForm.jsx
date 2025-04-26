import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/slices/userSlice';
import logo from "../../../assets/svg/logoBlack.svg";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaExclamationCircle, FaUser, FaArrowRight} from "react-icons/fa";
import { MdTaskAlt } from 'react-icons/md';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
function SignUpForm(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [userName, setUserName]= useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', userName: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const savedUserName= localStorage.getItem('userName');
    if (savedEmail) {
      setEmail(savedEmail);
    }
    if(savedUserName){
      setUserName(savedUserName);
    }
  }, []);

  const validateForm = () => {
    let tempErrors = { email: '', password: '', userName: '', confirmPassword: '' };
    let isValid = true;


    if (!userName) {
      tempErrors.userName = 'Name is required';
      isValid = false;
    } else if (userName.includes('.') || userName.includes('/') || userName.includes('%')) {
      tempErrors.userName = `Name cannot contain special characters like "./%, etc."`;
      isValid = false;
    }


    if (!email) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email is invalid';
      isValid = false;
    }


    if (!password) {
      tempErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }


    if (!confirmPassword) {
      tempErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (confirmPassword !== password) {
      tempErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Save to localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', userName);

      // Save to Redux
      dispatch(setUserData({
        email: email,
        userName: userName
      }));

      navigate('/form');
    } else {
      setIsSubmitting(false);
    }
  };
  return(
    <div className="h-full overflow-y-auto px-4">
      <RouterLink to="/homepage"><img src={logo} alt="Youvative Logo" className="-mt-7 -ml-10"/></RouterLink>
      <form onSubmit={handleSubmit}>
        <div className="mx-40 -mt-20">
          <div className="text-center">
            <div className="flex justify-center items-center gap-6 mx-auto">
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
            </div>
            <h1 className="text-[#5E15EB] text-4xl font-extrabold mb-6">Create Account</h1>

            <div className="mt-2 my-2">
              <div className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-13 text-lg rounded-md ${errors.userName ? 'border border-red-500' : ''}`}>
                <span className="self-center text-white">
                  <FaUser/>
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type="text"
                  name="user-name"
                  id="user-name"
                  placeholder="Full Name"
                  onChange={(e) => setUserName(e.target.value)}
                  value={userName}
                />
              </div>
              {errors.userName && (
                <div className="text-red-500 text-left text-sm flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.userName}</span>
                </div>
              )}
            </div>

            <div className=" mb-2">
              <div className={`flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md ${errors.email ? 'border border-red-500' : ''}`}>
                <span className="self-center text-white">
                  <FaEnvelope/>
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <div className="text-red-500 text-left text-sm flex items-center ">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="my-2">
              <div className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-13 text-lg rounded-md ${errors.password ? 'border border-red-500' : ''}`}>
                <span className="self-center text-white">
                  <FaLock/>
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="self-center text-white"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-500 text-left text-sm flex items-center ">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <div className="my-2">
              <div className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-13 text-lg rounded-md ${errors.confirmPassword ? 'border border-red-500' : ''}`}>
                <span className="self-center text-white">
                  <FaArrowRight/>
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type={show ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="self-center text-white"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="text-red-500 text-left text-sm flex items-center ">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            <p className="text-[#9B9B9B] hover:text-[#FFFFFF] transition-colors duration-300">
              <RouterLink to="/login">Already have an account? Log in</RouterLink>
            </p>

            <button
              type="submit"
              className="bg-[#5D17E9] text-white text-xl rounded-lg py-3 px-16 font-bold transition-all duration-300 hover:bg-[#4A12BA] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default SignUpForm;
