import { useEffect, useState } from "react";
import { Posts } from "../data/posts";
import { timeSince } from "../utils/timeSince"; //post time should be at my Post Model
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
    <main className="lg:w-3/4 rounded-lg space-y-4">
      <NewPost setPosts={setPosts} setCurrentTime={setCurrentTime} />

    {/*This defines the skeleton of the posts when posted 
       Add: A better defined post card like structure with better defined sections for Title, Description, Resume, Image.
    */}
      {posts.map(({ id, name, photo, time, content }, i) => (
        <div key={i} className="bg-white p-2 rounded-lg">
          {/*Username, Profile Pic, Post's time, delete post button*/}
          <header className="flex justify-between">
            <div className="flex gap-2">
              {/*This is the user profile photo */}
              <img
                src={photo}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="leading-tight">
                <p className="font-semibold">{name}</p>
                <p className="text-gray-400">{timeSince(currentTime, time)}</p>
              </div>
            </div>
            {name === currentUser.name && (
              <TrashIcon
                className="size-5 cursor-pointer text-gray-500 hover:text-gray-600"
                onClick={() => deletePost(id, setPosts)}
              />
            )}
          </header>

          {/*This is the post itself: the text an the image*/}
          <div>
            {content.text.split("\n").map((text, i) => (
              <p key={i} className="text-lg mb-2">
                {text}
              </p>
            ))}

            <img src={content.img} />
          </div>

          {/*Liking the comment +  complex functionality -> commenting and sharing.*/}
          <footer className="flex justify-between py-2">
            <div className="flex gap-6">
              <HeartIcon className="size-5 cursor-pointer hover:text-gray-500 transition-all" />
              <ChatBubbleLeftIcon className="size-5 cursor-pointer hover:text-gray-500 transition-all" />
            </div>
            <ShareIcon className="size-5 cursor-pointer hover:text-gray-500 transition-all" />
          </footer>
        </div>
      ))}
    </main>
  );
}

export default Main;