import { createContext, useContext, useState } from "react";

// Create a User Context
const UserContext = createContext(null);

// Create a custom hook to access the context
export const useUser = () => useContext(UserContext);

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Global user state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
