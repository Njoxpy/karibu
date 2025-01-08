import { useContext } from "react";
import { PrintingContext } from "../../context/PrintingContext";

// Custom hook to use PrintingContext
export const usePrinting = () => {
  const context = useContext(PrintingContext);

  if (!context) {
    throw new Error("usePrinting must be used within a PrintingContextProvider");
  }

  return context;
};
