import { useContext } from "react";
import { HardwareContext } from "../../context/HardwareContext";

// Custom hook to use HardwareContext
export const useHardware = () => {
  const context = useContext(HardwareContext);

  if (!context) {
    throw new Error("useHardware must be used within a HardwareContextProvider");
  }

  return context;
};
