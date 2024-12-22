// import context
import { createContext, useReducer } from "react";

import { authReducer } from "./reducer/authReducer";

export const AuthContext = createContext()


export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer,
        { user: null }
    )
    console.log(`auth context state: ${state}`);
    return (
        <AuthContextProvider value={{ ...state, dispatch }}>
            {children}
        </AuthContextProvider>
    )
}