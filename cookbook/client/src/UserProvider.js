import React, { useState, createContext } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(true);

  const toggleAuth = () => {
    setIsAuthorized(prev => !prev);
  };

  const value = { isAuthorized, toggleAuth };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
