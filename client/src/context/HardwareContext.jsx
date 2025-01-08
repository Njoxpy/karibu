import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { hardwareReducer } from "./reducer/Hardware/hardwareReducer";

export const HardwareContext = createContext();

export const HardwareContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(hardwareReducer, {
    products: [],
    orders: [],
  });

  return (
    <HardwareContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HardwareContext.Provider>
  );
};

// PropTypes validation
HardwareContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
