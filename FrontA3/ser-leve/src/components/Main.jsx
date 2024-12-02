import { useEffect, useState } from "react";
import { Posts } from "../data/posts";
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

function Main() {
  const [posts, setPosts] = useState(Posts);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="lg:w-3/4 rounded-lg space-y-6 flex flex-col flex-grow">
      {/* Create new post */}
      <NewPost />

      {/* Render posts */}
      {posts.map(({ id, name, photo, time, content }, i) => (
        <div
          key={i}
          className="bg-white rounded-lg p-4 shadow-lg flex flex-col mx-auto"
          style={{ minWidth: "59rem" }}
        >
          {/* Post Header */}
          <header className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              {/* User profile photo */}
              <img
                src={photo}
                alt={`${name}'s profile`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{name}</p>
                <p className="text-gray-400 text-sm">
                  {timeSince(currentTime, time)}
                </p>
              </div>
            </div>
            {name === currentUser.name && (
              <TrashIcon
                className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-600"
                onClick={() => deletePost(id, setPosts)}
              />
            )}
          </header>

          {/* Post Content */}
          <div className="mb-4">
            {content.text.split("\n").map((text, i) => (
              <p key={i} className="text-lg mb-2">{text}</p>
            ))}
            {content.img && (
              <img
                src={content.img}
                alt="Post content"
                className="rounded-lg w-full object-contain mt-2"
              />
            )}
          </div>

          {/* Post Footer */}
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
