import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { godownReducer } from "./reducer/Godown/godownReducer";

export const GodownContext = createContext();

export const GodownContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(godownReducer, {
    products: [],
    orders: [],
  });

  return (
    <GodownContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GodownContext.Provider>
  );
};

// PropTypes validation
GodownContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
