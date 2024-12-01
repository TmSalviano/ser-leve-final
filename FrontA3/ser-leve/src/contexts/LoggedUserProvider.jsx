import React, { createContext, useState, useContext } from 'react';

const LoggedUserContext = createContext();

export const useLoggedUser = () => {
  return useContext(LoggedUserContext);
};

export const LoggedUserProvider = ({ children }) => {
  // Initialize state directly from sessionStorage
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = sessionStorage.getItem('loggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const setUser = (user) => {
    setLoggedInUser(user);
    if (user) {
      // Store user in sessionStorage if not null
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
      // Clear sessionStorage if user is null
      sessionStorage.removeItem('loggedInUser');
    }
  };

  return (
    <LoggedUserContext.Provider value={{ loggedInUser, setUser }}>
      {children}
    </LoggedUserContext.Provider>
  );
};
