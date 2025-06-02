import { useEffect } from "react";
import { setPageTitle } from "../utils/pageTitle";

export const usePageTitle = (title) => {
  useEffect(() => {
    setPageTitle(title);

    return () => {
      setPageTitle("");
    };
  }, [title]);
};
