import { NavLink, Outlet,useNavigate } from "react-router-dom";
import "./Sidebar.css";
function Sidebar() {
  const navigate = useNavigate();
   const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
  <div className="layout">
      
      <aside className="sidebar">
        <div className="sidebar-header">
          Cafe ☕
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/dashboard" end className="menu-link">
            Dashboard
          </NavLink>

          <NavLink to="/dashboard/tables" className="menu-link">
            Manage Tables
          </NavLink>

          <NavLink to="/dashboard/menu" className="menu-link">
            Manage Menu
          </NavLink>

          <NavLink to="/dashboard/orders" className="menu-link">
            Orders
          </NavLink>

          <NavLink to="/dashboard/billing" className="menu-link">
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

