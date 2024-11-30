import { useRef, useState } from "react";
import { createPost, handleImage, handleText } from "../utils/NewPostUtils";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { currentUser } from "../data/currentUser";

function NewPost({ setPosts, setCurrentTime }) {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState(undefined);
  const textareaRef = useRef(undefined);

  return (
    <div className="bg-white rounded-lg p-2 flex flex-col gap-2">
      <div className="flex items-start w-full flex-grow">
        {/*Add: More structured Post Model: with title, description, image, etc.*/}
        <textarea
          ref={textareaRef}
          type="text"
          rows={1}
          value={postText}
          placeholder="What's in your mind?"
          className="w-full outline-none px-2 resize-none py-2 overflow-hidden flex-grow"
          onChange={(e) => handleText(e, setPostText, textareaRef)}
        />
        {/*Post Button*/}
        <button
          className="font-bold bg-green-500 px-7 py-2 rounded-lg text-white text-sm hover:bg-green-600 transition-all"
          onClick={() =>
            createPost(
              textareaRef,
              postText,
              image,
              currentUser,
              setPostText,
              setImage,
              setPosts,
              setCurrentTime
            )
          }
        >
          Post
        </button>
      </div>
      {/*Fix: Make the Photo label stay at the bottom when a photo is added*/}
        {image && <img src={image} className="h-36 p-2 w-full self-center object-contain" />}
      <div className="photo-label-div mt-auto">
        <label
          htmlFor="image-upload"
          className="inline-flex gap-1 items-center cursor-pointer hover:text-gray-500 transition-all"
        >
          <PhotoIcon className="size-5" />
          <span className="font-semibold text-sm hidden sm:inline">Photo</span>
        </label>

        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleImage(e, setImage)}
        />
      </div>

    </div>
  );
}

export default NewPost;