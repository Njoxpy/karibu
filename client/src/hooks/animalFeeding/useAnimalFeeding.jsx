import { useContext } from "react";
import { AnimalFeedingContext } from "../../context/AnimalFeedingContext";

// Custom hook to use AnimalFeedingContext
export const useAnimalFeeding = () => {
  const context = useContext(AnimalFeedingContext);

  if (!context) {
    throw new Error(
      "useAnimalFeeding must be used within a AnimalFeedingContextProvider"
    );
  }

  return context;
};
