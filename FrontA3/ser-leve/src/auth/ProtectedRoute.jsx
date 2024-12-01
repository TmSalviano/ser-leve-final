import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLoggedUser } from '../contexts/LoggedUserProvider';

const ProtectedRoute = ({ children }) => {
  const { loggedInUser } = useLoggedUser();

  // Redirect to Login if not logged in
  if (!loggedInUser) {
    return <Navigate to="/Login" replace />;
  }

  // Otherwise, render the child components
  return children;
};

export default ProtectedRoute;
