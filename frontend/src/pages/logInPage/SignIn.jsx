import { useState, useEffect } from "react";
import authService from "../../services/authService";
import logo from "../../assets/svg/logoBlack.svg";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaExclamationCircle } from "react-icons/fa";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserTasks } from '../../store/slices/tasksSlice';

// Admin email for role-based redirection
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "m_beyahmedkhernache@estin.dz";

function SignIn(){
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token) {
      // If logged in user is admin, redirect to admin dashboard
      if (userEmail === ADMIN_EMAIL) {
        navigate('/admin');
      } else {
        // Otherwise redirect to user interface
        navigate('/userinterface');
      }
    } else {
      // If there's a saved email (but not logged in), pre-fill it
      if (userEmail) {
        setEmail(userEmail);
      }
    }
  }, [navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError('');

    if (validateForm()) {
      try {
        // Use the authService directly to login
        await authService.login(email, password);
        
        // Store user email for role-based redirection
        localStorage.setItem('userEmail', email);
        
        // Check if the logged in user is admin
        if (email === ADMIN_EMAIL) {
          navigate('/admin');
        } else {
          // For regular users, fetch tasks and strategy before redirecting
          try {
            // Fetch user tasks using Redux thunk
            await dispatch(fetchUserTasks()).unwrap();
            
            // Fetch user's monthly strategy
            const response = await fetch('api/strategy.php', {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
              }
            });
            
            if (!response.ok) {
              throw new Error('Failed to fetch strategy');
            }
            
            // Navigate to user interface after data is fetched
            navigate('/userinterface');
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Still navigate to user interface even if data fetch fails
            navigate('/userinterface');
          }
        }
      } catch (error) {
        setLoginError(error.message || 'Invalid credentials. Please try again.');
        console.error('Login error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };
  
  return(
    <div className="h-full overflow-y-auto px-4">
      <RouterLink to="/homepage"><img src={logo} alt="Youvative Logo" className="-mt-7 -ml-10"/></RouterLink>
      <form onSubmit={handleSubmit}>
        <div className="mx-40">
          <div className="text-center">
            <h1 className="text-[#5E15EB] text-5xl font-extrabold">Sign in to Start</h1>

            {loginError && (
              <div className="text-red-500 text-sm mt-2 mb-2">
                {loginError}
              </div>
            )}

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
