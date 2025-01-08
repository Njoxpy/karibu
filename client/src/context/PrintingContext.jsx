import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { printingReducer } from "./reducer/printing/printingReducer";

export const PrintingContext = createContext();

export const PrintingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(printingReducer, {
    products: [],
    orders: [],
  });

  return (
    <PrintingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PrintingContext.Provider>
  );
};

// PropTypes validation
PrintingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
