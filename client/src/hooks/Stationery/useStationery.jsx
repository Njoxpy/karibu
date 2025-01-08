import { useContext } from "react";
import { StationeryContext } from "../../context/StationeryContext";

// Custom hook to use StationeryContext
export const useStationery = () => {
  const context = useContext(StationeryContext);

  if (!context) {
    throw new Error("useStationery must be used within a StationeryContextProvider");
  }

  return context;
};
