import { useState, useRef } from "react";
import { useLoggedUser } from "../contexts/LoggedUserProvider";  
import { PhotoIcon } from "@heroicons/react/24/outline";  

function NewPost() {
  const [titulo, setTitulo] = useState("");  
  const [resumo, setResumo] = useState("");  
  const [descricao, setDescricao] = useState("");  
  const [image, setImage] = useState(undefined);  
  const { loggedInUser } = useLoggedUser();  
  const textareaRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleCreatePost = async () => {
    const receitaData = {
      usuarioId: loggedInUser?.Id, // Use the logged-in user's ID
      titulo,
      resumo,
      descricao,
      imagem: image || null, // Use the temporary image URL if available
    };

    try {
      const response = await fetch("http://localhost:3000/receita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(receitaData),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const createdPost = await response.json();
      console.log(createdPost);

      

      // Reset form fields
      setTitulo("");
      setResumo("");
      setDescricao("");
      setImage(undefined);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg mx-auto "
      style={{minWidth: "59rem"}}
    >
      <h2 className="text-2xl font-bold mb-4">Poste Uma Receita</h2>

      {/* Title input */}
      <div className="mb-4">
        <label htmlFor="titulo" className="block text-sm font-semibold mb-1">Titulo</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Recipe Title"
        />
      </div>

      {/* Summary input */}
      <div className="mb-4">
        <label htmlFor="resumo" className="block text-sm font-semibold mb-1">Resumo</label>
        <input
          id="resumo"
          type="text"
          value={resumo}
          onChange={(e) => setResumo(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Short Summary"
        />
      </div>

      {/* Description textarea */}
      <div className="mb-4">
        <label htmlFor="Descricao" className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          ref={textareaRef}
          id="descricao"
          rows={4}
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Detailed Description"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label
          htmlFor="image-upload"
          className="inline-flex gap-1 items-center cursor-pointer hover:text-gray-500 transition-all"
        >
          <PhotoIcon className="w-5 h-5" />
          <span className="font-semibold text-sm">Upload Image</span>
        </label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange} // Handle file change here
        />
        {image && (
          <img
            src={image} // Display the temporary image URL
            alt="Uploaded Preview"
            className="mt-2 h-36 w-full object-contain rounded-lg"
          />
        )}
      </div>

      {/* Post Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleCreatePost}
          className="font-bold bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default NewPost;
