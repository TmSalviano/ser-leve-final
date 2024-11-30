import React, { useEffect, useState } from "react";
import { timeSince } from "../../utils/timeSince";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { currentUser } from "../../data/currentUser";
import { deletePost } from "../../utils/NewPostUtils";

function ReceitaCard({ id, name, photo, time, content }) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-100">
        <img
          src={photo}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">#{id}</p>
        </div>
        <span className="text-xs text-gray-500">{timeSince(currentTime, time)}</span>

        {/* Delete button only for the current user's posts */}
        {name === currentUser.name && (
          <TrashIcon
            className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-600"
            onClick={() => deletePost(id, setPosts)}
          />
        )}
      </div>

      {/* Image */}
      <img
        src={content.img}
        alt={name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        {content.text.split("\n").map((text, i) => (
          <p key={i} className="text-sm text-gray-600">{text}</p>
        ))}
      </div>

      {/* Footer */}
      <footer className="flex justify-between py-2">
        <div className="flex gap-6">
          <HeartIcon className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-all" />
          <ChatBubbleLeftIcon className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-all" />
        </div>
        <ShareIcon className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-all" />
      </footer>
    </div>
  );
}

export default ReceitaCard;
