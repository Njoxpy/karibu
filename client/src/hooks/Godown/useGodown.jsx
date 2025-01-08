import { useContext } from "react";
import { GodownContext } from "../../context/GodownContext";

// Custom hook to use GodownContext
export const useGodown = () => {
  const context = useContext(GodownContext);

  if (!context) {
    throw new Error("useGodown must be used within a GodownContextProvider");
  }

  return context;
};
