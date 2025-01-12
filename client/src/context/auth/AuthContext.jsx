import { createContext, useReducer } from 'react'
import { authReducer } from '../reducer/auth/authReducer'

export const AuthContext = createContext()

// Reducer function


// AuthContextProvider component
// Updated initial state with token
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('authToken') || null,
  });

  console.log('AuthContext state:', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

