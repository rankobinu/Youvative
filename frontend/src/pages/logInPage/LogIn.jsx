import { useEffect } from "react";
import { setPageTitle } from "../../utils/pageTitle";
import SignIn from "./SignIn";
import WelcomeBack from "./WelcomeBack";

function LogIn() {
  useEffect(() => {
    setPageTitle("Login");
  }, []);
  return (
    <div className="grid grid-cols-[55%_45%] bg-gradient-to-t from-[#5E4683] to-[#150F1D] w-full h-screen overflow-hidden">
      <SignIn></SignIn>
      <WelcomeBack></WelcomeBack>
    </div>
  );
}
export default LogIn;
