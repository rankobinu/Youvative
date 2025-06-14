import { useEffect } from "react";
import { setPageTitle } from "../../../utils/pageTitle";
import PaymentSection from "./PaymentSection";

function PaymentPage() {
  useEffect(() => {
    setPageTitle("Payment");
  }, []);

  return (
    <div className="bg-gradient-to-t from-[#5E4683] to-[#150F1D] w-full h-screen overflow-hidden">
      <PaymentSection />
    </div>
  );
}

export default PaymentPage;
