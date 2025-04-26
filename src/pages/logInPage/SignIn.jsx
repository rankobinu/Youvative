import { useState, useEffect } from "react";
import logo from "../../assets/svg/logoBlack.svg";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaExclamationCircle } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const ADMIN_CREDENTIALS = {
  email: "m_beyahmedkhernache@estin.dz",
  password: "123456789"
};

function SignIn(){
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const validateForm = () => {
    let tempErrors = { email: '', password: '' };
    let isValid = true;


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

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Check if credentials match admin credentials
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminPassword', password);
        navigate('/admin');
      } else {
        // Regular user login
        localStorage.setItem('userEmail', email);
        navigate('/userinterface');
      }
    }
    setIsSubmitting(false);
  };
  return(
    <div className="h-full overflow-y-auto px-4">
      <RouterLink to="/homepage"><img src={logo} alt="Youvative Logo" className="-mt-7 -ml-10"/></RouterLink>
      <form onSubmit={handleSubmit}>
        <div className="mx-40">
          <div className="text-center">
            <h1 className="text-[#5E15EB] text-5xl font-extrabold">Sign in to Start</h1>

            <div className="my-2">
              <div className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-15 text-lg rounded-md ${errors.email ? 'border border-red-500' : ''}`}>
                <span className="self-center">
                  <FaEnvelope/>
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <div className="text-red-500 text-left text-sm flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            <div className="my-2">
              <div className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-15 text-lg rounded-md ${errors.password ? 'border border-red-500' : ''}`}>
                <span className="self-center">
                  <FaLock/>
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="self-center"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaEyeSlash/> : <FaEye/>}
                </button>
              </div>
              {errors.password && (
                <div className="text-red-500 text-left text-sm flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <p className="text-[#9B9B9B] hover:text-[#FFFFFF] transition-colors duration-300 mt-4">
              <RouterLink to="/resetpassword">Forgot your password?</RouterLink>
            </p>

            <button
              type="submit"
              className="bg-[#5D17E9] text-2xl text-black rounded-sm py-3 px-20 font-extrabold mt-6 transition-transform hover:scale-105 duration-300 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Login'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default SignIn;
