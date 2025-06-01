import { useEffect } from "react";
import { setPageTitle } from "../../../utils/pageTitle";
import FormSection from "./FormSection";

function FormPage() {
  useEffect(() => {
    setPageTitle('Form');
  }, []);

  return(
    <div className="bg-gradient-to-t from-[#5E4683] to-[#150F1D] w-full h-screen overflow-hidden">
      <FormSection/>
    </div>
  )
}
export default FormPage;
