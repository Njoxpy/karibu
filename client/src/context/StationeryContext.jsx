import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { stationeryReducer } from "./reducer/Stationery/stationeryReducer";

export const StationeryContext = createContext();

export const StationeryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stationeryReducer, {
    products: [],
    orders: [],
  });

  return (
    <StationeryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StationeryContext.Provider>
  );
};

// PropTypes validation
StationeryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
