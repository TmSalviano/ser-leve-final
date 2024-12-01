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
      try {
        setLoggedInUser(JSON.parse(savedUser)); // Parse and set the user from sessionStorage
      } catch (error) {
        console.error("Failed to parse saved user data:", error);
        sessionStorage.removeItem('loggedInUser');  // Optionally clear corrupted data
      }
    }
  }, []);

  const setUser = (user) => {
    setLoggedInUser(user);
    try {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user)); // Store user in sessionStorage
    } catch (error) {
      console.error("Failed to save user to sessionStorage:", error);
    }
  };

  return (
    <LoggedUserContext.Provider value={{ loggedInUser, setUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
