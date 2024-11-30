import Nav from "../Nav";
import Sidebar from "../SideBar";
import Aside from "../Aside";

export default function HomeLayout({
  children,
  colors = {
    backgroundColor: "#f3f4f6",
    frontgroundColor: "#ffffff",
    accentColor1: "#16a34a",
    accentColor2: "#22c55e",
  }
}) {
  return (
    <div 
      className="flex flex-col h-screen w-screen overflow-x-hidden" // Prevent horizontal overflow, allow vertical scrolling
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <Nav />
      <div 
        className="flex flex-col h-full w-full overflow-y-auto" // Ensures content can grow and scroll vertically
        style={{ backgroundColor: colors.backgroundColor }}
      >
        <div className="flex flex-grow">
            <Sidebar />
          <div 
            className="w-full p-4 shadow-md rounded flex-grow justify-center items-center" // Allows content to grow and fill available space
            style={{ backgroundColor: colors.accentColor1 }}
          >
            {children}
          </div>
          <Aside />
        </div>
      </div>
    </div>
  );
}
