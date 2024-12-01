import React, { createContext, useState, useContext, useEffect } from 'react';

const LoggedUserContext = createContext();

export const useLoggedUser = () => {
  return useContext(LoggedUserContext);
};

export const LoggedUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Load user from sessionStorage on page load
    const savedUser = sessionStorage.getItem('loggedInUser');
    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser)); // Parse and set the user from sessionStorage
    }
  }, []);

  const setUser = (user) => {
    setLoggedInUser(user);
    // Store user in sessionStorage
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  return (
    <LoggedUserContext.Provider value={{ loggedInUser, setUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
