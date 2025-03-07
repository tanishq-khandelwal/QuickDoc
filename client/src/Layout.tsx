import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronLast,
  ChevronFirst,
  Home,
  Calendar,
  LucideIcon,
  Clock,
  User,
  Hospital,
} from "lucide-react";
import logo from "@/assets/QuickDoc-custom-logo.svg";
// Sidebar Context Type
interface SidebarContextType {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

// Creating Sidebar Context
export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

// Sidebar Provider Props
interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [expanded, setExpanded] = useState<boolean>(true);
  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      <div className="flex">{children}</div>
    </SidebarContext.Provider>
  );
}

// Sidebar Item Type
interface SidebarItemType {
  title: string;
  url: string;
  icon: LucideIcon;
}

// Sidebar Component
export function AppSidebar() {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("AppSidebar must be used within SidebarProvider");
  const { expanded, setExpanded } = context;

  // Local state for role and loggedIn status
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Sidebar Items based on role
  let sidebarItems: SidebarItemType[] = [];

  useEffect(() => {
    const updateState = () => {
      const newRole = localStorage.getItem("role");
      const newLoggedInStatus = localStorage.getItem("isLoggedIn") === "true";

      setRole(newRole);
      setIsLoggedIn(newLoggedInStatus);
    };

    // Listen to localStorage changes (for dynamic updates)
    window.addEventListener("storage", updateState);

    // Run once on mount
    updateState();

    return () => {
      window.removeEventListener("storage", updateState);
    };
  }, []);

  if (role === "doctor") {
    sidebarItems = [
      { title: "Home", url: "/", icon: Home },
      // { title: "Events", url: "/events", icon: Calendar },
      { title: "Availability", url: "/availability", icon: Clock },
      { title: "Appointments", url: "/appointments", icon: Calendar },
      { title: "Profile", url: "/doctor/profile", icon: User },
    ];
  }

  const userData = localStorage.getItem("user");
  const patientId = userData ? JSON.parse(userData).user_id : null;

  if (role === "patient") {
    sidebarItems = [
      { title: "Home", url: "/", icon: Home },
      { title: "Doctors", url: "/doctors", icon: Hospital },
      { title: "Appointments", url: "/appointments/me", icon: Calendar },
      { title: "Profile", url: `/patient/profile/${patientId}`, icon: User },
    ];
  }

  if (role === "guestpatient") {
    sidebarItems = [
      { title: "Home", url: "/", icon: Home },
      { title: "Doctors", url: "/doctors", icon: Hospital },
      { title: "Appointments", url: "/appointments/me", icon: Calendar },
    ];
  }

  if (role === "guestdoctor") {
    sidebarItems = [
      { title: "Home", url: "/", icon: Home },
      { title: "Availability", url: "/availability", icon: Clock },
      { title: "Appointments", url: "/appointments", icon: Calendar },
    ];
  }

  const userName: string = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!).name
    : "Undefined";

  return (
    <aside
      className={`sticky min-h-screen left-0 top-0  h-screen transition-all duration-300 ${
        expanded ? "w-52" : "w-16"
      }`}
    >
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* Sidebar Header */}
        <div className="p-4 flex justify-between items-center">
          <img
            src={logo}
            className={`transition-all duration-300 ${
              expanded ? "w-32" : "w-0 opacity-0"
            }`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar Menu */}
        {isLoggedIn ? (
          <ul className="flex-1 px-3">
            {sidebarItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.title}
                url={item.url}
              />
            ))}
          </ul>
        ) : (
          <div>
            <SidebarItem icon={Home} text="Home" url="/" />
          </div>
        )}

        {/* Sidebar Footer - User Info */}
        {isLoggedIn && (
          <div className="border-t flex p-3 items-center">
            <User />
            <div
              className={`transition-all duration-300 overflow-hidden ${
                expanded ? "w-52 ml-3" : "w-0 opacity-0"
              }`}
            >
              <h4 className="font-semibold hover:cursor-pointer">{userName}</h4>
            </div>
            {/* {expanded && <MoreVertical size={20} className="ml-auto" />} */}
          </div>
        )}
      </nav>
    </aside>
  );
}

// Sidebar Item Props
interface SidebarItemProps {
  icon: LucideIcon;
  text: string;
  url: string;
}

// Sidebar Item Component
export function SidebarItem({ icon: Icon, text, url }: SidebarItemProps) {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error("SidebarItem must be used within SidebarProvider");
  const { expanded } = context;
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group 
        ${
          isActive
            ? "bg-[#199FD9] text-white"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      <Link to={url} className="flex items-center w-full">
        <Icon size={20} />
        <span
          className={`transition-all duration-300 overflow-hidden ${
            expanded ? "w-52 ml-3" : "w-0 opacity-0"
          }`}
        >
          {text}
        </span>
      </Link>
    </li>
  );
}

// Layout Component
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
