import { currentUser } from "../data/currentUser";
import {
    ArrowLeftEndOnRectangleIcon,
    BellIcon,
    ChatBubbleOvalLeftIcon,
  
    GlobeAltIcon,
    HomeIcon,
 
    UserIcon,
  } from "@heroicons/react/24/outline";
import { useLoggedUser } from "../contexts/LoggedUserProvider";
  
  const menu = [
    {
      text: "Home",
      href: "/Home",
      icon: <HomeIcon className="size-5" />,
    },
    {
      text: "Edit Profile",
      href: "/settings",
      icon: <UserIcon className="size-5" />,
    },
    {
      text: "Notifications",
      href: "/notifications",
      icon: <BellIcon className="size-5" />,
    },
    {
      text: "Message",
      href: "/message",
      icon: <ChatBubbleOvalLeftIcon className="size-5" />,
    },
    {
      text: "Explorar",
      href: "/explore",
      icon: <GlobeAltIcon className="size-5" />,
    },
  ];
 
  function Sidebar() {
    const path = window.location.pathname;
    const { loggedInUser, setUser } = useLoggedUser(); // Access context here
  
    const handleLogout = async () => {

      const { Id } = loggedInUser || {};  // Destructure only the 'Id' property !!!Case Sensitive
      console.log(Id);
        try {
          // Make a GET request to the backend to log out
          const response = await fetch(`http://localhost:3000/api/usuario/auth/logout/${Id}`, {
            method: 'GET',
          });
  
          const data = await response.json(); // Parse the JSON response
  
          console.log(data);

          if (data.success) {
            console.log(data.message); // Log the success message
          } else {
            console.error(data.message); // Log the error message
            alert(data.message); // Optionally display the error message to the user
          }
        } catch (error) {
          console.error('Error logging out:', error); // Handle any errors that occur
        }
      // Clear user state in context and session storage after logout
      setUser(null);
    };
    
    

    return (
      <div className=" w-full sm:w-auto bottom-0 left-0  lg:w-1/4 sm:static ">
        <div className="hidden rounded-lg p-4 sm:flex gap-2 space-y-4">
          <img src={currentUser.photo} className="w-12 rounded-full" />
          <div className="leading-snug">
            <p className="font-semibold">{currentUser.name}</p>
            <p className="text-gray-400">{currentUser.username}</p>
          </div>
        </div>
  
        <div className="gap-1 flex justify-between sm:flex-col shadow  shadow-black sm:shadow-none text-xl overflow-hidden">
          {menu.map(({ text, href, icon }, i) => (
            <a
              href={href}
              key={i}
              className={`${
                href === path ? "bg-green-500 text-white" : "hover:bg-gray-300"
              } py-6 w-full sm:px-10 font-bold flex sm:justify-normal justify-center gap-1 items-center transition-all`}
            >
              <span>{icon}</span>
              <span className="hidden sm:inline">{text}</span>
            </a>
          ))}
        </div>

        {/*Logout Div */}
        <div className=" mt-0 flex justify-between sm:flex-col shadow  shadow-black sm:shadow-none text-xl overflow-hidden">
        <button
          onClick={handleLogout}
          className={`py-6 w-full sm:px-10 font-bold flex sm:justify-normal justify-center gap-1 items-center transition-all hover:bg-gray-300`}
        >
          <span>
            <ArrowLeftEndOnRectangleIcon className="size-5" />
          </span>
          <span className="hidden sm:inline">Logout</span>
        </button>
        </div>
      </div>
    );
  }
  
  export default Sidebar;