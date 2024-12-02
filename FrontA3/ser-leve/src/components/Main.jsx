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

  const handleTrash = async (receitaId) => {
    try {
      const response = await fetch(`http://localhost:3000/receita/${receitaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete receita");
      }

      // Remove the deleted receita from the state
      setReceitas((prevReceitas) =>
        prevReceitas.filter((receita) => receita.id !== receitaId)
      );
      console.log(`Receita with ID ${receitaId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting receita:", error);
    }
  };

  // Fetch receitas using following IDs
  const fetchReceitas = async () => {
    try {
      if (followingIds.length === 0) return; // Skip if there are no following IDs

      const numericFollowingIds = followingIds.map((id) => Number(id));

      const response = await fetch("http://localhost:3000/receita/main-feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...numericFollowingIds, loggedInUser?.Id]),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch receitas: ${response.statusText}`);
      }

      const receitasData = await response.json();
      console.log(receitasData);
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
      return Array.isArray(data) ? data.map(Number).filter((id) => !isNaN(id)) : [];
    } catch (error) {
      console.error("Error fetching following IDs:", error);
      return [];
    }
  };

  // Fetch following IDs and set state
  useEffect(() => {
    const fetchFollowingIds = async () => {
      const fetchedIds = await followingIdArray();
      const numberIds = fetchedIds.map((id) => Number(id));
      setFollowingIds(numberIds);
    };

    fetchFollowingIds();
  }, []);

  // Fetch receitas when followingIds change
  useEffect(() => {
    fetchReceitas();
  }, [followingIds]);

  // Update the current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="lg:w-3/4 rounded-lg space-y-6 flex flex-col flex-grow h-full">
      {/* Create new receita */}
      <NewPost />

      {/* Render receitas */}
      {receitas.map(({ id, usuarioId, titulo, resumo, descricao, imagem, criado }) => (
        <div
          key={id}
          className="bg-white rounded-lg shadow-lg flex flex-col mx-auto"
          style={{ minWidth: "59rem" }}
        >
          {/* Receita Header */}
          <header className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src={usuarioId === loggedInUser?.Id ? loggedInUser.ProfilePicture : currentUser.photo}
                alt={`${titulo}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{usuarioId === loggedInUser?.Id ? loggedInUser.Nome : currentUser.name}</p>
                <p className="text-gray-400 text-sm">
                  {timeSince(currentTime, new Date(criado))}
                </p>
              </div>
            </div>
            {usuarioId === loggedInUser?.Id && (
              <TrashIcon
                className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-600 transition-all"
                onClick={() => handleTrash(id, loggedInUser?.Id)}
              />
            )}
          </header>

          {/* Receita Body (Content) */}
          <div className="p-4 space-y-4">
            <div>
              <p className="font-bold text-lg">Título:</p>
              <p>{titulo}</p>
            </div>

            {/*Isso aqui e a imagem da  */}
            {imagem && (
              <div>
                <p className="font-bold text-lg">Imagem:</p>
                <img
                  src={imagem}
                  alt="Receita content"
                  className="rounded-lg w-full object-contain"
                  onError={(e) => {
                    e.target.closest('div').style.display = 'none'; // Hide the entire div on error
                  }}
                />
              </div>
            )}


            <div>
              <p className="font-bold text-lg">Descrição:</p>
              <p className="text-gray-600">{descricao}</p>
            </div>
          </div>

          {/* Receita Footer */}
          <footer className="flex justify-between items-center p-4 border-t border-gray-200">
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
