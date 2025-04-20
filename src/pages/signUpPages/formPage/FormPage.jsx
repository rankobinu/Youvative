import { useEffect } from "react";
import { setPageTitle } from "../../../utils/pageTitle";
import FormSection from "./FormSection";
import StartNew from "../components/StartNew";
function SignUp() {
  useEffect(() => {
    setPageTitle('Form');
  }, []);

  return(
    <div className="grid grid-cols-[55%_45%] bg-gradient-to-t from-[#5E4683] to-[#150F1D] w-full h-screen overflow-hidden">
      <FormSection/>
      <StartNew/>
    </div>
  )
}
export default SignUp;