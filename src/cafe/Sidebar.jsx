import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { endSession } from "../utils/auth";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    endSession();
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="layout">
      <button className="mobile-toggle" onClick={toggleSidebar}>
        ☰
      </button>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          Cafe ☕
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/dashboard" end className="menu-link" onClick={closeSidebar}>
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/tables" className="menu-link" onClick={closeSidebar}>
            Manage Tables
          </NavLink>

          <NavLink to="/dashboard/menu" className="menu-link" onClick={closeSidebar}>
            Manage Menu
          </NavLink>

          <NavLink to="/dashboard/orders" className="menu-link" onClick={closeSidebar}>
            Orders
          </NavLink>

          <NavLink to="/dashboard/billing" className="menu-link" onClick={closeSidebar}>
            Billing
          </NavLink>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </nav>

        <div className="sidebar-footer">
          © Cafe System
        </div>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Sidebar;
