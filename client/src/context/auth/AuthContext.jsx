import { createContext, useReducer } from "react";
import { authReducer } from "../reducer/auth/authReducer";

export const AuthContext = createContext();

// AuthContextProvider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("authToken") || null,
  });

  const login = (user, token) => {
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const setToken = (token) => {
    dispatch({ type: "SET_TOKEN", payload: token });
  };

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
