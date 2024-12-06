import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const NavbarComponent = ({ toggleSidebar }) => {
   const navigate = useNavigate();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const user = JSON.parse(localStorage.getItem("user"));

   const toggleDropdown = () => {
      setIsDropdownOpen((prev) => !prev);
   };

   const handleLogout = () => {
      navigate("/");
   }

   return (
      <nav className="w-full px-16 bg-white border-b border-gray-200">
         <div className="px-3 py-3 lg:px-5 lg:pl-3 flex justify-between items-center w-full">
            <button
               onClick={toggleSidebar}
               className="p-2 text-gray-700 top-4 left-4 z-50 text-xl"
               >
            <FaBars/>
            </button>
   
            <div className="flex items-center">
               <div className="flex items-center ms-3 relative">
                  <div className="flex items-center gap-4 justify-center">
                     <p className="text-lg font-semibold text-gray-700">{user.email}</p>
                     <img
                        src={user.photo}
                        alt={user.name}
                        className="w-16 h-16 rounded-full border-2 cursor-pointer object-cover"
                        onClick={toggleDropdown}
                     />

                  </div>

                  {isDropdownOpen && (
                     <div
                        className="absolute right-0 z-50 border top-0 mt-16 w-48 bg-white rounded-lg shadow-lg"
                     >
                        <ul className="py-1">
                           <li className="block px-4 py-2 font-semibold text-gray-600 text-lg hover:bg-primary rounded-md hover:text-white">
                              <Link
                                 to={"profile"}
                              >
                                 Profile
                              </Link>
                           </li>
                           <li className="block px-4 py-2 font-semibold text-gray-600 text-lg hover:bg-primary rounded-md hover:text-white">
                              <button
                                 onClick={handleLogout}
                              >
                                 Sign out
                              </button>
                           </li>
                        </ul>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </nav>
   );
};

export default NavbarComponent;