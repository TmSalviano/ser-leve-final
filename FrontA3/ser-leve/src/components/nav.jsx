import {Link, useLocation} from "react-router-dom";



function Nav() {
    const userLocation = useLocation();

    const userDestination = () => {
        if (userLocation.pathname === "/Home") {
            return "/Login";
        }else{
            return "/Home";
        }
    }

    return (
      //fix: uncentered flex items
      //The link needs to change from Login to Home when logged in
      <nav className="bg-green-500 flex items-center justify-start gap-5 p-2 ">
        <Link to="/Home" className="flex items-center justify-start gap-5">
          <img src="Logotipo marca nutricionista veganismo saúde maçã verde_processed (1).png" alt="Logo" className="h-10 object-contain " />
          <h1 className="font-bold text-gray-800 text-2xl">SerLeve</h1>
        </Link>
      </nav>
    );
  }
  
  export default Nav;
