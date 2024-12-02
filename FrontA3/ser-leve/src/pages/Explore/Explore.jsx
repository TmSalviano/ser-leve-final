import Nav from '../../components/Nav';
import Sidebar from '../../components/SideBar';

import React, { useState, useEffect } from "react";
import { currentUser } from '../../data/currentUser';

function Explore() {

  const [randomRecipes, setRandomRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3000/receita/random");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        console.log(data);
        setRandomRecipes(data); // Assuming the API returns an array of recipes
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);


  const recipes = [
    {
      id: 1,
      title: "Bolo de Chocolate",
      description: "Um bolo delicioso e fácil de fazer.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Torta de Limão",
      description: "Refrescante e perfeita para sobremesas.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Pizza Margherita",
      description: "Clássica e irresistível.",
      image: "https://via.placeholder.com/150",
    },
  ];

  // the bottom of the card is transparent for some reason
  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-md h-full">
      <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold mb-4 text-green-600">Explore Receitas</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {randomRecipes.map((recipe) => (

            <div
              key={recipe.id}
              className="border rounded-lg shadow hover:shadow-lg transition duration-200"
            >
              <img
                src={recipe.imagem || currentUser.photo}
                alt={recipe.resumo || "not found"}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold">{recipe.resumo || "resumo not found"}</h2>
                <p className="text-sm text-gray-600">{recipe.descricao || "descricao not found"}</p>
                
              </div>
            </div>
        
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
