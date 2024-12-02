import Nav from "../Nav";
import Sidebar from "../SideBar";
import Aside from "../Aside";

const styles = {
  container: {
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE 10+
  },
  webkitScrollbar: {
    display: "none", // Chrome, Safari, and Edge
  },
};

export default function HomeLayout({
  children,
  colors = {
    backgroundColor: "#f3f4f6",
    frontgroundColor: "#ffffff",
    accentColor1: "#16a34a",
    accentColor2: "#22c55e",
  },
}) {
  return (
    <div
      className="flex flex-col h-screen w-screen overflow-x-hidden" // Prevent horizontal overflow
      style={{ backgroundColor: colors.backgroundColor }}
    >
      <Nav />
      <div
        className="flex flex-col h-full w-full " // Main container
        style={{ backgroundColor: colors.backgroundColor }}
      >
        <div className="flex flex-grow ">
          <Sidebar />
          <div
            className="w-full p-4 shadow-md rounded flex-grow overflow-y-auto" // Enable vertical scrolling
            style={{
              ...styles.container,
              backgroundColor: colors.accentColor1,
              maxHeight: "calc(100vh - 0rem)", // Adjust height for header/Nav height
            }}
          >
            {children}
          </div>
          <Aside />
        </div>
      </div>
    </div>
  );
}
