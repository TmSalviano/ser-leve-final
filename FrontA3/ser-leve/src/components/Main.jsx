import { useEffect, useState } from "react";
import { timeSince } from "../utils/timeSince";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import NewPost from "./NewPost";
import { currentUser } from "../data/currentUser";
import { deletePost } from "../utils/NewPostUtils";
import { useLoggedUser } from "../contexts/LoggedUserProvider";

function Main() {
  const [clickCount, setClickCount] = useState(0);
  const [followingIds, setFollowingIds] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const { loggedInUser } = useLoggedUser();


  // Fetch receitas using following IDs
  const fetchReceitas = async () => { 
    try {
      if (followingIds.length === 0) return; // Skip if there are no following IDs
  
      // Ensure that all followingIds and loggedInUser.Id are numbers
      const numericFollowingIds = followingIds.map(id => Number(id)); // Convert each ID to a number
  
      const response = await fetch("http://localhost:3000/receita/main-feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Combine both arrays of IDs, ensuring all are numbers
        body: JSON.stringify([...numericFollowingIds, loggedInUser?.Id]), // Pass the following IDs
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch receitas: ${response.statusText}`);
      }
  
      const receitasData = await response.json();
      console.log("Receitas:", receitasData);
      setReceitas(receitasData); // Set the fetched receitas data
    } catch (error) {
      console.error("Error fetching receitas:", error);
    }
  };
  

  const followingIdArray = async () => { 
    try {
      const response = await fetch("http://localhost:3000/api/follow/following-ids/3", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Following IDs:", data);
  
      // Ensure the data is an array of numbers
      const validIds = Array.isArray(data) ? data.map(Number).filter(id => !isNaN(id)) : [];
      return validIds;
    } catch (error) {
      console.error("Error fetching following IDs:", error);
      return [];
    }
  };

  // Trigger the fetch of following IDs on initial load
  useEffect(() => {
    const fetchFollowingIds = async () => {
      const fetchedIds = await followingIdArray();
      // Now typecast to numbers and set the state
      const numberIds = fetchedIds.map((id) => Number(id));
      setFollowingIds(numberIds);
    };

    fetchFollowingIds();
  }, []); // Only run once when the component mounts

  // Trigger the fetch of receitas whenever followingIds change
  useEffect(() => {
    fetchReceitas();
  }, [followingIds]); // Runs every time followingIds change

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="lg:w-3/4 rounded-lg space-y-6 flex flex-col flex-grow">
      {/* Create new receita */}
      <NewPost />

      {/* Render receitas */}
      {receitas.map(({ id, usuarioId, titulo, resumo, descricao, imagem, criado }, i) => (
        <div
          key={id}
          className="bg-white rounded-lg p-4 shadow-lg flex flex-col mx-auto"
          style={{ minWidth: "59rem" }}
        >
          {/* Receita Header */}
          <header className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              {/* User profile photo */}
              <img
                src="https://via.placeholder.com/48" // Replace with user photo
                alt={`${titulo}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{titulo}</p>
                <p className="text-gray-400 text-sm">
                  {timeSince(currentTime, new Date(criado))}
                </p>
              </div>
            </div>
            {usuarioId === loggedInUser.id && (
              <TrashIcon
                className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-600"
                onClick={() => deletePost(id, setReceitas)} // Modify this if needed
              />
            )}
          </header>

          {/* Receita Content */}
          <div className="mb-4">
            <p className="text-lg mb-2">{resumo}</p>
            <p className="text-gray-600 text-sm">{descricao}</p>
            {imagem && (
              <img
                src={imagem}
                alt="Receita content"
                className="rounded-lg w-full object-contain mt-2"
              />
            )}
          </div>

          {/* Receita Footer */}
          <footer className="flex justify-between items-center pt-2 border-t border-gray-200">
            <div className="flex gap-4">
              <HeartIcon className="w-6 h-6 cursor-pointer hover:text-gray-500 transition-all" />
              <ChatBubbleLeftIcon className="w-6 h-6 cursor-pointer hover:text-gray-500 transition-all" />
            </div>
            <ShareIcon className="w-6 h-6 cursor-pointer hover:text-gray-500 transition-all" />
          </footer>
        </div>
      ))}
    </main>
  );
}

export default Main;
