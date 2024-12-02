import { useState, useEffect } from "react";
import { useLoggedUser } from "../contexts/LoggedUserProvider";
import { currentUser } from '../data/currentUser';

function Aside() {
  const { loggedInUser } = useLoggedUser();
  const { Id } = loggedInUser || {}; // Get loggedInUserId from the context
  const [queryString, setQueryString] = useState(""); // State for input query string
  const [recommendedProfiles, setRecommendedProfiles] = useState([]); // State to store recommended profiles
  const [loggedInUserFollowing, setLoggedInUserFollowing] = useState([]); // State to store the list of followed users

  const handleFollowToggle = async (profileId, isProfileFollowing) => {
    const targetUserId = profileId;

    if (isProfileFollowing) {
      // If the user is following, unfollow the profile
      try {
        const response = await fetch(`http://localhost:3000/api/follow/unfollow/${Id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ targetUserId }),
        });

        if (response.ok) {
          setLoggedInUserFollowing((prev) =>
            prev.filter((user) => user.Id !== profileId)
          );

          console.log(loggedInUserFollowing);
        } else {
          console.error("Failed to unfollow the user");
        }
      } catch (error) {
        console.error("Error unfollowing user:", error);
      }
    } else {
      // If the user is not following, follow the profile
      try {
        const response = await fetch(`http://localhost:3000/api/follow/follow/${Id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ targetUserId }),
        });

        if (response.ok) {
          setLoggedInUserFollowing((prev) => [...prev, { Id: profileId }]);
          console.log(loggedInUserFollowing);
        } else {
          console.error("Failed to follow the user");
        }
      } catch (error) {
        console.error("Error following user:", error);
      }
    }
  };

  const isFollowing = (displayedUserId) => {
    return loggedInUserFollowing.some((user) => user.Id === displayedUserId);
  };

  // Fetch recommended profiles when queryString or Id changes
  useEffect(() => {
    if (queryString && Id) {
      const fetchRecommendedProfiles = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/usuario/QuemSeguir/${Id}?queryString=${queryString}`
          );
          if (response.ok) {
            const data = await response.json();
            setRecommendedProfiles(data); // Set the fetched profiles
          } else {
            console.error("Failed to fetch profiles");
          }
        } catch (error) {
          console.error("Error fetching profiles:", error);
        }
      };

      fetchRecommendedProfiles();
    } else {
      setRecommendedProfiles([]); // Clear profiles if queryString or Id is missing
    }
  }, [queryString, Id]);

  // Fetch the list of users the logged-in user is following
  useEffect(() => {
    if (Id) {
      const fetchFollowing = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/follow/following/${Id}`);
          if (response.ok) {
            const data = await response.json();
            // Make sure data is an array
            setLoggedInUserFollowing(Array.isArray(data) ? data : [data]);
          } else {
            console.error("Failed to fetch following list");
          }
        } catch (error) {
          console.error("Error fetching following list:", error);
        }
      };
      fetchFollowing();
    }
  }, [Id]);

  const handleSearchChange = (e) => {
    setQueryString(e.target.value); // Update queryString state when input changes
  };

  // Define static news array
  const news = [
    { title: "Nova atualização no React 18", link: "#", source: "Tech News" },
    { title: "JavaScript continua em alta em 2024", link: "#", source: "Dev Weekly" },
    { title: "Tailwind CSS: dicas avançadas", link: "#", source: "Frontend Blog" },
    { title: "Nova atualização no React 18", link: "#", source: "Tech News" },
    { title: "JavaScript continua em alta em 2024", link: "#", source: "Dev Weekly" },
  ];

  return (
    <aside className="w-full sm:w-1/4 space-y-4 p-4">
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          value={queryString}
          onChange={handleSearchChange}
          placeholder="Buscar..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Quem seguir (Recommended Profiles) */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Quem seguir</h2>
        <ul className="space-y-3">
          {recommendedProfiles.length > 0 ? (
            recommendedProfiles.map((profile, i) => (
              <li key={i} className="flex items-center gap-3 p-4 border rounded-lg shadow-sm">
                <img
                  src={profile.ProfilePicture || currentUser.photo}
                  alt={profile.Nome}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">{profile.Nome}</p>
                  <p className="text-xs text-gray-500">{profile.NameTag}</p>
                </div>
                {/* Conditionally display Follow or Unfollow button */}
                <button
                  className="ml-auto text-gray-600 text-sm font-semibold hover:underline"
                  onClick={
                    () => handleFollowToggle(profile.Id, isFollowing(profile.Id))
                  }
                >
                  {isFollowing(profile.Id) ? 'Unfollow' : 'Follow'}
                </button>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">Nenhum perfil encontrado</p>
          )}
        </ul>
      </div>

      {/* Notícias (News) */}
      <div>
        <h2 className="font-semibold text-lg mb-2">Notícias</h2>
        <ul className="space-y-3">
          {news.map((item, i) => (
            <li key={i} className="text-sm">
              <a
                href={item.link}
                className="text-gray-600 font-medium hover:underline"
              >
                {item.title}
              </a>
              <p className="text-xs text-gray-500">Fonte: {item.source}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Aside;
