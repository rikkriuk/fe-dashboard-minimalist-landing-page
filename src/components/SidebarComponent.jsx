import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBriefcase,
  FaBookOpen,
  FaTasks,
  FaClipboardList,
  FaEnvelope,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const SidebarComponent = ({ isSidebarOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(true);

  const isActive = (path) => location.pathname === path;
  const toggleActivities = () => setIsActivitiesOpen(!isActivitiesOpen);

  const handleLogout = () => {
      dispatch(logout());
      navigate("/");
  };

  return (
    <div className={`flex border ${isSidebarOpen ? "w-96" : "w-0"}`}>
      <nav
        className={`w-72 h-screen bg-white transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-52"
        }`}
      >
        <div className="flex items-center justify-center py-6">
          <h1 className={`font-bold text-lg ${isSidebarOpen ? "text-gray-800" : "text-white"}`}>
            dsgnr.
          </h1>
        </div>

        <ul className="mt-4 space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center p-3 ${
                isActive("/dashboard")
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              } rounded-md`}
            >
              <FaTasks className={`${isActive("/dashboard") ? "text-white" : "text-primary"}`} />
              <span className="ml-3 font-semibold">Dashboard</span>
            </Link>
          </li>

          <li>
            <button
              onClick={toggleActivities}
              className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FaClipboardList className="text-primary" />
              <span className="ml-3 font-semibold">Activities</span>
              <span
                className={`ml-auto text-primary transition-transform duration-200 ${
                  isActivitiesOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <FaChevronDown />
              </span>
            </button>

            {isActivitiesOpen && (
              <ul className="mt-2 ml-6 space-y-1">
                <li>
                  <Link
                    to="/dashboard/blog"
                    className={`flex items-center p-2 ${
                      isActive("/dashboard/blog")
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-md`}
                  >
                    <FaUsers className={`${isActive("/dashboard/blog") ? "bg-primary" : "text-gray-600"}`} />
                    <span className="ml-3">Blog</span>
                  </Link>
                </li>
                
                <li>
                  <Link
                    to="/dashboard/portfolio"
                    className={`flex items-center p-2 ${
                      isActive("/dashboard/portfolio")
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-md`}
                  >
                    <FaBriefcase className={`${isActive("/dashboard/portfolio") ? "bg-primary" : "text-gray-600"}`} />
                    <span className="ml-3">Portfolio</span>
                  </Link>
                </li>
               
                <li>
                  <Link
                    to="/dashboard/contact"
                    className={`flex items-center p-2 ${
                      isActive("/dashboard/contact")
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-md`}
                  >
                    <FaEnvelope className={`${isActive("/dashboard/contact") ? "bg-primary" : "text-gray-600"}`} />
                    <span className="ml-3">Contact</span>
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard/testimonial"
                    className={`flex items-center p-2 ${
                      isActive("/dashboard/testimonial")
                        ? "bg-primary text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    } rounded-md`}
                  >
                    <FaBookOpen className={`${isActive("/dashboard/testimonial") ? "bg-primary" : "text-gray-600"}`} />
                    <span className="ml-3">Testimonial</span>
                  </Link>
                </li>


              </ul>
            )}
          </li>

          <li className="mt-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FaSignOutAlt className="text-primary" />
              <span className="ml-3 font-semibold">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarComponent;