import React, { useState, useEffect } from 'react';

export default function Teste() {
  const [usuarios, setUsuarios] = useState([]); // State to store fetched data
  const [error, setError] = useState(null); // State to manage errors

  // Function to fetch data from the backend
  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuario', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }, 
      });

      // If the response is not OK, throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the response as JSON and update state
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  // Use useEffect to call the fetch function when the component mounts
  useEffect(() => {
    fetchUsuarios(); // Invoke fetchUsuarios to fetch data when component mounts
  }, []); // Empty dependency array ensures it runs once when the component mounts

  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <h1>This is the HTTP request test</h1>
      <div className="h-80 w-full bg-white">
        <h1>Getting Usuarios</h1>
        {/* Map over usuarios array to display each usuario */}
        {usuarios.map((usuario) => (
          <div key={usuario.Id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>Nome:</strong> {usuario.Nome}</p>
            <p><strong>Email:</strong> {usuario.Email}</p>
            <p><strong>Biografia:</strong> {usuario.Biografy}</p>
          </div>
        ))}
      </div>
    </div>
  );


  
}
