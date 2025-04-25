import { useState} from "react";
import Select from "react-select";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdTaskAlt } from 'react-icons/md';
import { FaInstagram, FaMapMarkerAlt, FaExclamationCircle, FaFlag, FaEdit } from 'react-icons/fa';
import { setUserData } from '../../../store/slices/userSlice';
import logo from "../../../assets/svg/logoBlack.svg";

function FormSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [insta, setInsta] = useState('');
  const [location, setLocation] = useState(null);
  const [goals, setGoals] = useState(null);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locationOptions = [
    { label: "Afghanistan", value: "AF" },
    { label: "Albania", value: "AL" },
    { label: "Algeria", value: "DZ" },
    { label: "Andorra", value: "AD" },
    { label: "Angola", value: "AO" },
    { label: "Argentina", value: "AR" },
    { label: "Armenia", value: "AM" },
    { label: "Australia", value: "AU" },
    { label: "Austria", value: "AT" },
    { label: "Azerbaijan", value: "AZ" },
    { label: "Bahamas", value: "BS" },
    { label: "Bahrain", value: "BH" },
    { label: "Bangladesh", value: "BD" },
    { label: "Barbados", value: "BB" },
    { label: "Belarus", value: "BY" },
    { label: "Belgium", value: "BE" },
    { label: "Belize", value: "BZ" },
    { label: "Benin", value: "BJ" },
    { label: "Bhutan", value: "BT" },
    { label: "Bolivia", value: "BO" },
    { label: "Brazil", value: "BR" },
    { label: "Canada", value: "CA" },
    { label: "China", value: "CN" },
    { label: "France", value: "FR" },
    { label: "Germany", value: "DE" },
    { label: "India", value: "IN" },
    { label: "Italy", value: "IT" },
    { label: "Japan", value: "JP" },
    { label: "Mexico", value: "MX" },
    { label: "Netherlands", value: "NL" },
    { label: "Nigeria", value: "NG" },
    { label: "Pakistan", value: "PK" },
    { label: "Russia", value: "RU" },
    { label: "Saudi Arabia", value: "SA" },
    { label: "South Africa", value: "ZA" },
    { label: "Spain", value: "ES" },
    { label: "United Kingdom", value: "GB" },
    { label: "United States", value: "US" },
  ];

  const goalsOptions = [
    { value: "GF", label: "Grow Followers" },
    { value: "GB", label: "Grow Business" },
    { value: "CM", label: "Create More Content" },
  ];

  const customSelectStyles = {
    control: (base) => ({
      ...base,
      background: 'rgba(178, 143, 250, 0.31)',
      border: 'none',
      boxShadow: 'none',
      padding: '0.5rem',
      '&:hover': {
        border: 'none'
      }
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? '#5E15EB' : 'rgba(178, 143, 250, 0.31)',
      color: 'white',
      '&:hover': {
        backgroundColor: '#5E15EB'
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'rgba(178, 143, 250, 0.31)',
      backdropFilter: 'blur(10px)'
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white'
    }),
    placeholder: (base) => ({
      ...base,
      color: 'rgba(255, 255, 255, 0.5)'
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};
    if (!insta) newErrors.insta = 'Instagram handle is required';
    if (!location) newErrors.location = 'Location is required';
    if (!goals) newErrors.goals = 'Goals are required';
    if (!description) newErrors.description = 'Description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const userData = {
      email: localStorage.getItem('userEmail'),
      instagram: insta,
      location: location.value,
      goals: goals.value,
      description: description
    };

    dispatch(setUserData(userData));
    localStorage.setItem('userInsta', insta);
    localStorage.setItem('userDescription', description);
    localStorage.setItem('userLocation', location.value);
    localStorage.setItem('userGoals', goals.value);

    navigate('/strategy');
  };

  return (
    <div className="min-h-screen flex flex-col px-8">
      <div>
        <RouterLink to="/homepage">
          <img src={logo} alt="Youvative Logo" className="-mt-7 -ml-10"/>
        </RouterLink>
      </div>
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col -mt-25">
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-6">
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
            </div>
            <h1 className="text-[#5E15EB] text-4xl font-extrabold">Complete Your Profile</h1>
            <p className="text-white/80  text-lg">Tell us more about yourself and your goals</p>
          </div>

          <div className="space-y-4 max-w-xl mx-auto w-full -mt-3">
            <div>
              <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                <FaInstagram className="text-white"/>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none placeholder:content-center placeholder-white/50"
                  type="text"
                  placeholder="Instagram"
                  value={insta}
                  onChange={(e) => setInsta(e.target.value)}
                />
              </div>
              {errors.insta && (
                <div className="text-red-500 text-sm flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.insta}</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                <FaMapMarkerAlt className="text-white mr-2"/>
                <Select
                  styles={customSelectStyles}
                  options={locationOptions}
                  value={location}
                  onChange={setLocation}
                  placeholder="Select Location"
                  className="text-white w-full"
                />
              </div>
              {errors.location && (
                <div className="text-red-500 text-sm flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.location}</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                <FaFlag className="text-white mr-2"/>
                <Select
                  styles={customSelectStyles}
                  options={goalsOptions}
                  value={goals}
                  onChange={setGoals}
                  placeholder="Select Your Goals"
                  className="text-white w-full"
                />
              </div>
              {errors.goals && (
                <div className="text-red-500 text-sm flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.goals}</span>
                </div>
              )}
            </div>

            <div>
              <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                <FaEdit className="text-white"/>
                <textarea
                  className="min-w-[85%] mx-2 pl-3 py-3 self-center bg-transparent text-white outline-none placeholder-white/50 resize-none"
                  placeholder="Tell us about yourself..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="2"
                />
              </div>
              {errors.description && (
                <div className="text-red-500 text-sm flex items-center mt-1">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.description}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center mt-4 pb-20">
            <button
              type="submit"
              className="bg-[#5D17E9] text-white text-xl rounded-lg py-3 px-16 font-bold transition-all duration-300 hover:bg-[#4A12BA] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue to Strategy'}
            </button>

            <RouterLink 
              to="/signup" 
              className="text-[#9B9B9B] hover:text-white transition-colors duration-300 mt-4"
            >
              Back to Sign Up
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormSection;
