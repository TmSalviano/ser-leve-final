import { useState } from 'react';
import { useLoggedUser } from "../../contexts/LoggedUserProvider";
import { currentUser } from '../../data/currentUser';

const Settings = () => {
  const { loggedInUser, setUser } = useLoggedUser(); // Access context here
  const { Id, NameTag, Nome, ProfilePicture, Biografy, DarkMode } = loggedInUser || {};  // Destructure the user attributes

  const [profileData, setProfileData] = useState({
    NameTag: NameTag || "", // Initialize NameTag
    Nome: Nome || "", // Initialize Nome
    Biografy: Biografy || "", // Initialize Biografy
    ProfilePicture: ProfilePicture || currentUser.photo, // Initialize ProfilePicture
    DarkMode: DarkMode || false, // Initialize DarkMode
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setProfileData({ ...profileData, [name]: checked });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      setProfileData({ ...profileData, ProfilePicture: imageUrl });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the updated data to send to the server
    const updatedData = {
      Nome: profileData.Nome,
      NameTag: profileData.NameTag,
      ProfilePicture: profileData.ProfilePicture,
      Biografy: profileData.Biografy,
      DarkMode: profileData.DarkMode,
    };

    try {
      // Make the POST request to the backend to update the user's profile
      const response = await fetch(`http://localhost:3000/api/usuario/editProfile/${Id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Convert the data to JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
      }

      // Assuming successful response, update the user data in context
      const updatedUser = {
        ...loggedInUser,
        ...updatedData, // Update the logged-in user data with the new profile details
      };

      setUser(updatedUser); // Update the logged-in user state in context
      alert("Perfil atualizado com sucesso!"); // Notify user of successful update

    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Ocorreu um erro ao atualizar o perfil.");
    }
  };

  const toggleDarkMode = () => {
    setProfileData({ ...profileData, DarkMode: !profileData.DarkMode });
  };

  return (
    <div className="flex-1 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-green-500">Configurações</h2>
      <div>
        <h3 className="text-lg font-semibold mb-4">Editar Perfil</h3>
        
        {/* Change Profile Picture */}
        <div className="mb-6 text-center">
          <div className="relative inline-block">
            {/* Display Profile Picture */}
            <img
              src={profileData.ProfilePicture && typeof profileData.ProfilePicture !== 'string'
                    ? URL.createObjectURL(profileData.ProfilePicture) 
                    : profileData.ProfilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="ProfilePicture"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
            >
              Mudar Foto
            </label>
            <input
              type="file"
              id="ProfilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form to edit user details */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="Nome" className="block font-bold text-gray-700">
              Nome:
            </label>
            <input
              type="text"
              id="Nome"
              name="Nome"
              value={profileData.Nome}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="NameTag" className="block font-bold text-gray-700">
              NameTag:
            </label>
            <input
              type="text"
              id="NameTag"
              name="NameTag"
              value={profileData.NameTag}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="Biografy" className="block font-bold text-gray-700">
              Biografia:
            </label>
            <textarea
              id="Biografy"
              name="Biografy"
              value={profileData.Biografy}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="3"
            />
          </div>

          {/* Dark Mode Toggle Button */}
          <div className="flex items-center space-x-2">
            <label htmlFor="DarkMode" className="block font-bold text-gray-700">
              Dark Mode:
            </label>
            <button
              type="button"
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full relative transition-colors ${profileData.DarkMode ? 'bg-black' : 'bg-white'} border-2 border-gray-300`}
            >
              <div
                className={`absolute w-6 h-6 rounded-full bg-gray-100 transition-transform ${profileData.DarkMode ? 'transform translate-x-6' : 'transform translate-x-0'}`}
              />
            </button>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
