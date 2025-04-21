import { useState, useEffect } from "react";
import Select from "react-select";
import logo from "../../../assets/svg/logoBlack.svg";
import { FaMapMarkerAlt, FaExclamationCircle, FaInstagram, FaArrowRight} from "react-icons/fa";
import { MdTaskAlt,MdArticle } from 'react-icons/md';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import checkBox from "../../../assets/svg/check-box.svg";
function FormSection(){
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [insta, setInsta] = useState('');
  const [location, setLocation] = useState(null);
  const [goals, setGoals] = useState(null);
  const [errors, setErrors] = useState({ location: '', goals: '', insta: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const countryOptions = [
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
  useEffect(() => {
    const savedDescription = localStorage.getItem('userDescription');
    const savedInsta = localStorage.getItem('userInsta');
    if (savedDescription) {
      setDescription(savedDescription);
    }
    if(savedInsta){
      setInsta(savedInsta);
    }
  }, []);

  const validateForm = () => {
    let tempErrors = { location: '', goals: '', insta: '', description: '' };
    let isValid = true;

    if (!insta) {
      tempErrors.insta = 'Instagram Account is required';
      isValid = false;
    } else if (!insta.startsWith('@') && insta.length < 3) {
      tempErrors.insta = 'Please enter a valid Instagram handle';
      isValid = false;
    }

    if (!description) {
      tempErrors.description = 'Description is required';
      isValid = false;
    }

    if (!goals) {
      tempErrors.goals = 'Please select a goal';
      isValid = false;
    }

    if (!location) {
      tempErrors.location = 'Please select your location';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      localStorage.setItem('userInsta', insta);
      localStorage.setItem('userDescription', description);
      localStorage.setItem('userLocation', location?.value || '');
      localStorage.setItem('userGoals', goals?.value || '');

      navigate('/userinterface');
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
              <MdTaskAlt className="text-[#5E15EB] text-4xl" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
              <MdTaskAlt className="text-gray-500 text-4xl" />
            </div>
            <h1 className="text-[#5E15EB] text-4xl font-extrabold mb-6">Form</h1>

            <div className="mt-2 my-2">
              <div className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-13 text-lg rounded-md ${errors.insta ? 'border border-red-500' : ''}`}>
                <span className="self-center">
                  <FaInstagram/>
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type="text"
                  name="insta"
                  id="insta"
                  placeholder="Instagram Account"
                  onChange={(e) => setInsta(e.target.value)}
                  value={insta}
                />
              </div>
              {errors.insta && (
                <div className="text-red-500 text-left text-sm flex items-center">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.insta}</span>
                </div>
              )}
            </div>

            <div className=" mb-2">
              <div className={`flex pl-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md ${errors.location ? 'border border-red-500' : ''}`}>
                <span className="self-center mr-3">
                  <FaMapMarkerAlt/>
                </span>
                <Select
                  options={countryOptions}
                  placeholder="Select a country"
                  className="min-w-[90%]  text-start text-white bg-transparent self-center"
                  value={location}
                  onChange={setLocation}
                  styles={{
                    control: (base) => ({
                      ...base,
                      cursor:'pointer',
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    }),
                    option: (base) => ({
                      ...base,
                      color: 'black',
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: 'white',
                    }),
                  }}
                />
              </div>
              {errors.location && (
                <div className="text-red-500 text-left text-sm flex items-center ">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.location}</span>
                </div>
              )}
            </div>

            <div className="my-2">
              <div className={`flex pl-4 bg-[#B28FFA4F] justify-start min-h-13 text-lg rounded-md ${errors.goals ? 'border border-red-500' : ''}`}>
                <span className="self-center">
                  <img src={checkBox} alt="Check Box Icon" className="text-black mr-[0.44rem]"/>
                </span>
                <Select
                  options={goalsOptions}
                  placeholder="Select a goal"
                  className="min-w-[90%]  text-start text-white bg-transparent self-center "
                  value={goals}
                  onChange={setGoals}
                  styles={{
                    control: (base) => ({
                      ...base,
                      cursor: 'pointer',
                      background: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    }),
                    option: (base) => ({
                      ...base,
                      color: 'black',
                    }),
                    singleValue: (base) => ({
                      ...base,
                      color: 'white',
                    }),
                  }}
                />
              </div>
              {errors.goals && (
                <div className="text-red-500 text-left text-sm flex items-center ">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.goals}</span>
                </div>
              )}
            </div>

            <div className="my-2">
              <div className={`flex px-4 bg-[#B28FFA4F] justify-start min-h-13 text-lg rounded-md ${errors.discreption ? 'border border-red-500' : ''}`}>
                <span className="self-center">
                  <MdArticle />
                </span>
                <input
                  className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none"
                  type="text"
                  name="description"
                  id="description"
                  placeholder="What is your content about?"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </div>
              {errors.description && (
                <div className="text-red-500 text-left text-sm flex items-center ">
                  <FaExclamationCircle className="mr-1" />
                  <span>{errors.description}</span>
                </div>
              )}
            </div>

            <p className="text-[#9B9B9B] hover:text-[#FFFFFF] transition-colors duration-300">
              <RouterLink to="/login">Already have an account? Log in</RouterLink>
            </p>

            <button
              type="submit"
              className="bg-[#5D17E9] text-2xl text-black rounded-sm py-3 px-20 font-extrabold mt-2 transition-transform hover:scale-105 duration-300 cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default FormSection;