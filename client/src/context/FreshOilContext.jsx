// context/FreshOilContext.js

import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { freshOilReducer } from "./reducer/FreshOil/freshOilReducer";

// Create the context
export const FreshOilContext = createContext();

// Context provider
export const FreshOilContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(freshOilReducer, {
    products: [],
    orders: [],
  });

  return (
    <FreshOilContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FreshOilContext.Provider>
  );
};

// PropTypes validation for children
FreshOilContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
