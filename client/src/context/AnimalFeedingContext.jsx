import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { animalFeedingReducer } from "./reducer/animalFeeding/animalFeedingReducer";

export const AnimalFeedingContext = createContext();

export const AnimalFeedingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(animalFeedingReducer, {
    products: [],
    orders: [],
  });

  return (
    <AnimalFeedingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AnimalFeedingContext.Provider>
  );
};

// PropTypes validation
AnimalFeedingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
