import React from 'react';
import { useLoggedUser } from '..//../contexts/LoggedUserProvider'; // Correct path

const Teste = () => {
  const { loggedInUser } = useLoggedUser(); // Access logged-in user info from context

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      {loggedInUser ? (
        <div>
          <h1>Welcome, {loggedInUser.Email}!</h1> {/* Display user name or other info */}
          <p>Email: {loggedInUser.NameTag}</p> {/* Display email */}
        </div>
      ) : (
        <h1>No user logged in</h1> // Show a message if no user is logged in
      )}
    </div>
  );
};

export default Teste;
