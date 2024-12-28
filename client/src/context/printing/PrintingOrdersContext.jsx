import { createContext, useReducer } from "react";
import { printingOrderReducer } from "../reducer/printing/ordersReducer";

export const PrintingOrderContext = createContext();

export const PrintingOrderContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(printingOrderReducer, { order: null })

    return (
        <PrintingOrderContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PrintingOrderContext.Provider>
    )
}

