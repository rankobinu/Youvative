import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { MdTaskAlt } from 'react-icons/md';
import { FaCreditCard, FaCalendar, FaLock } from 'react-icons/fa';
import logo from "../../../assets/svg/logoBlack.svg";

function PaymentSection() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add payment processing logic here
    navigate('/userinterface');
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="min-h-screen flex flex-col px-8">
      <div>
        <RouterLink to="/homepage">
          <img src={logo} alt="Youvative Logo" className="-mt-7 -ml-10"/>
        </RouterLink>
      </div>
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col -mt-25">
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-6 mb-4">
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
              <MdTaskAlt className="text-4xl text-[#5E15EB]" />
            </div>
            <h1 className="text-[#5E15EB] text-4xl font-extrabold">Payment Details</h1>
            <p className="text-white/80 mt-2 text-lg">Enter your payment information to complete your subscription</p>
          </div>

          <div className="mt-auto bg-[#B28FFA4F] rounded-lg p-6 max-w-xl mx-auto w-full">
            <div className="space-y-4">
              <div>
                <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                  <FaCreditCard className="text-white"/>
                  <input
                    className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none placeholder-white/50"
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                    maxLength="19"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                  <FaCalendar className="text-white"/>
                  <input
                    className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none placeholder-white/50"
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength="5"
                  />
                </div>

                <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                  <FaLock className="text-white"/>
                  <input
                    className="min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none placeholder-white/50"
                    type="password"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    maxLength="3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-auto pb-20 gap-4">
            <button
              type="submit"
              className="bg-[#5D17E9] text-white text-xl rounded-lg py-3 px-16 font-bold transition-all duration-300 hover:bg-[#4A12BA] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue to Payment'}
            </button>

            <RouterLink 
              to="/strategy" 
              className="text-[#9B9B9B] hover:text-white transition-colors duration-300 "
            >
              Back to Strategy
            </RouterLink>
          </div>         
        </form>
      </div>
    </div>
  );
}

export default PaymentSection;
