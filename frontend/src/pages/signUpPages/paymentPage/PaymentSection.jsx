import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { MdTaskAlt } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FaCreditCard, FaCalendar, FaLock } from "react-icons/fa";
import logo from "../../../assets/svg/logoBlack.svg";
import subscriptionService from "../../../services/subscriptionService";
import {
  fetchUserProfile,
  fetchSubscriptionDetails,
} from "../../../store/slices/userSlice";

function PaymentSection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [cardErrors, setCardErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Check for saved strategy on component mount
  useEffect(() => {
    const savedPlan = localStorage.getItem("userPlan");
    if (savedPlan) {
      setSelectedPlan(savedPlan);
    }
  }, []);

  const validateCard = () => {
    const errors = {};
    let isValid = true;

    // Validate card number (should be 16 digits without spaces)
    const strippedCardNumber = cardNumber.replace(/\s/g, "");
    if (!strippedCardNumber) {
      errors.cardNumber = "Card number is required";
      isValid = false;
    } else if (strippedCardNumber.length !== 16) {
      errors.cardNumber = "Card number must be 16 digits";
      isValid = false;
    }

    // Validate expiry date (MM/YY format)
    if (!expiryDate) {
      errors.expiryDate = "Expiry date is required";
      isValid = false;
    } else {
      const [month, year] = expiryDate.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (!month || !year || month > 12 || month < 1) {
        errors.expiryDate = "Invalid expiry date";
        isValid = false;
      } else if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        errors.expiryDate = "Card has expired";
        isValid = false;
      }
    }

    // Validate CVV (3 digits)
    if (!cvv) {
      errors.cvv = "CVV is required";
      isValid = false;
    } else if (cvv.length !== 3) {
      errors.cvv = "CVV must be 3 digits";
      isValid = false;
    }

    setCardErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedPlan) {
      setError("Please select a plan");
      setIsSubmitting(false);
      return;
    }

    if (!validateCard()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare payment data - ONLY card details and plan
      const paymentData = {
        card_number: cardNumber.replace(/\s/g, ""),
        expiry_date: expiryDate,
        cvv: cvv,
        plan_type: selectedPlan,
      };

      // Always use the token from localStorage
      await subscriptionService.createSubscription(paymentData);

      // Fetch complete user profile
      dispatch(fetchUserProfile());
      dispatch(fetchSubscriptionDetails());

      // Navigate to user interface
      navigate("/userinterface");
    } catch (error) {
      setError("Payment processing failed: " + error.message);
      setIsSubmitting(false);
    }
  };

  const plans = [
    {
      id: "growth",
      title: "Growth Plan",
    },
    {
      id: "professional",
      title: "Professional Plan",
    },
    {
      id: "starter",
      title: "Starter Plan",
    },
  ];

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  return (
    <div className="min-h-screen flex flex-col px-8">
      <div>
        <RouterLink to="/homepage">
          <img src={logo} alt="Youvative Logo" className="-mt-7 -ml-10" />
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
            <h1 className="text-[#5E15EB] text-4xl font-extrabold">
              Payment Details
            </h1>
            <p className="text-white/80 mt-2 text-lg">
              Enter your payment information to complete your subscription
            </p>
          </div>

          <div className="mb-4 -mt-2 bg-[#B28FFA4F] rounded-lg p-6 max-w-xl mx-auto w-full">
            <div className="space-y-4">
              <div>
                <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                  <FaCreditCard className="text-white" />
                  <input
                    className={`min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none placeholder-white/50 ${
                      cardErrors.cardNumber ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength="19"
                  />
                </div>
                {cardErrors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {cardErrors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                  <FaCalendar className="text-white" />
                  <input
                    className={`min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none placeholder-white/50 ${
                      cardErrors.expiryDate ? "border-red-500" : ""
                    }`}
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) =>
                      setExpiryDate(formatExpiryDate(e.target.value))
                    }
                    maxLength="5"
                  />
                </div>
                {cardErrors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">
                    {cardErrors.expiryDate}
                  </p>
                )}

                <div className="flex px-4 bg-[#B28FFA4F] justify-start text-lg min-h-13 rounded-md items-center">
                  <FaLock className="text-white" />
                  <input
                    className={`min-w-[85%] mx-2 pl-3 py-3 max-h-10 self-center bg-transparent text-white outline-none placeholder-white/50 ${
                      cardErrors.cvv ? "border-red-500" : ""
                    }`}
                    type="password"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                    }
                    maxLength="3"
                  />
                </div>
                {cardErrors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{cardErrors.cvv}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedPlan === plan.id
                        ? "bg-[#5E15EB] text-white ring-4 ring-purple-400"
                        : "bg-[#B28FFA4F] text-white hover:bg-[#5E15EB]/50"
                    }`}
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setError("");
                    }}
                  >
                    <div className="p-4 h-full flex flex-col text-center">
                      <h2 className="text-xl font-bold  m-auto">
                        {plan.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center mt-auto pb-20 gap-4">
            <button
              type="submit"
              className="bg-[#5D17E9] text-white text-xl rounded-lg py-3 px-16 font-bold transition-all duration-300 hover:bg-[#4A12BA] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
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
