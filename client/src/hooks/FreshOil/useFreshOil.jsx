import { useContext } from "react";
import { FreshOilContext } from "../../context/FreshOilContext";

// Custom hook to use FreshOilContext
export const useFreshOil = () => {
  const context = useContext(FreshOilContext);

  if (!context) {
    throw new Error("useFreshOil must be used within a FreshOilContextProvider");
  }

  return context;
};
