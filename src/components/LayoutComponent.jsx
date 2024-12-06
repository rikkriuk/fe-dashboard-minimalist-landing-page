import React, { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import SidebarComponent from "./SidebarComponent";
import { Outlet } from "react-router-dom";

const LayoutComponent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex border">
      <SidebarComponent
        isSidebarOpen={isSidebarOpen}
      />
      <main className="transition-all duration-300 w-full">
        <NavbarComponent 
         toggleSidebar={toggleSidebar}
        />
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutComponent;