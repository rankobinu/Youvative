import { useEffect } from "react";
import { setPageTitle } from "../../../utils/pageTitle";
import SignUpForm from "./SignUpForm";
import StartNew from "../components/StartNew";
function SignUp() {
  useEffect(() => {
    setPageTitle("Sign Up");
  }, []);

  return (
    <div className="grid grid-cols-[55%_45%] bg-gradient-to-t from-[#5E4683] to-[#150F1D] w-full h-screen overflow-hidden">
      <SignUpForm />
      <StartNew />
    </div>
  );
}
export default SignUp;
