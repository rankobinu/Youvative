import { useEffect } from "react";
import { setPageTitle } from "../../../utils/pageTitle";
import StrategySection from "./StrategySection";

function StrategyPage() {
  useEffect(() => {
    setPageTitle('Choose Strategy');
  }, []);

  return(
    <div className="bg-gradient-to-t from-[#5E4683] to-[#150F1D] w-full h-screen overflow-hidden">
      <StrategySection/>
    </div>
  )
}

export default StrategyPage;
