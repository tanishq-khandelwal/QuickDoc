import React, { useState } from "react";
import {useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/avatar.svg"
import toast from "react-hot-toast";
import { LOGOUT_REQUEST } from "@/redux/actions/authActions";



const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const res =  localStorage.getItem("user");
  console.log(res)
  const user = res ? JSON.parse(res): null; 
  const navigate = useNavigate();


const dispatch = useDispatch();

const handleLogout = () => {
  dispatch({ type: LOGOUT_REQUEST });
  toast.success("Logged out successfully!");

  // Redirect to the login page
  navigate("/login");
};

  if(!user) return null;

  return (
    <div className="relative border-2 border-gray-600 rounded-full px-4 py-1 ">
      {/* Avatar Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <img
          src={user?.avatar || avatar}
          alt="User Avatar"
          className="w-7 h-7 rounded-full object-cover "
        />


        <span className="text-gray-600 font-medium">{user?.name || "User !"}</span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-5 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-30">
          <ul className="py-2">
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Profile
              </button>
            </li>
        
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
