import { Link } from "react-router-dom";
import { useContext } from "react";
import { SidebarContext } from "./Layout"; // Ensure correct import
import UserDropdown from "./components/Navbar/userDropDown";

export function Navbar() {
  const context = useContext(SidebarContext);
  const role = localStorage.getItem("role");
  if (!context) throw new Error("Navbar must be used within SidebarProvider");
  const { expanded } = context;

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <header
      className={`fixed  bg-white text-black shadow-md py-4  top-0 w-full z-10 transition-all duration-300 ${
        expanded ? "" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        {role === "guestpatient" || role === "guestdoctor" ? (
          <div className="flex  items-center justify-center  p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md gap-3">
          <p className="text-lg font-semibold">🔒 Access Restricted</p>
          <p className="text-sm">
            Please Sign Up to access more features.
          </p>
        </div>
        ) : (
          <div></div>
        )}
        <nav
          className={`${
            expanded
              ? "ml-auto mr-[25%] transition-all duration-300"
              : "ml-auto mr-[20%]"
          }`}
        >
          {isLoggedIn ? (
            <div>
              <UserDropdown />
            </div>
          ) : (
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Signup
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
}
