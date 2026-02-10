import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardTable.css";
import { defaultMenu } from "./menuData";

const DashboardTable = () => {
  const [tables, setTables] = useState([]);
  const [menu, setMenu] = useState([]);
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    activeTables: 0,
    pending: 0
  });
  const navigate = useNavigate();

  const loadDashboardData = () => {
    const savedTables = JSON.parse(localStorage.getItem("tables")) || [];
    setTables(savedTables);
    const savedMenu = JSON.parse(localStorage.getItem("cafe-menu")) || [];

    const updatedMenu = savedMenu.length > 0 ? savedMenu.map(item => {
      if (!item.image || item.image.trim() === "") {
        const defaultItem = defaultMenu.find(d => d.id === item.id);
        if (defaultItem) {
          return { ...item, image: defaultItem.image };
        }
      }
      return item;
    }) : defaultMenu;

    setMenu(updatedMenu);
    if (JSON.stringify(updatedMenu) !== JSON.stringify(savedMenu)) {
      localStorage.setItem("cafe-menu", JSON.stringify(updatedMenu));
    }
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const totalRevenue = savedOrders.reduce((acc, order) => acc + (order.total || 0), 0);
    const pendingOrders = savedOrders.filter(o => o.status !== "Paid").length;
    const activeTablesCount = savedTables.filter(t => t.status === "Occupied").length;

    setStats({
      orders: savedOrders.length,
      revenue: totalRevenue,
      activeTables: activeTablesCount,
      pending: pendingOrders
    });
  };

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { title: "Total Orders", value: stats.orders, icon: "📦" },
    { title: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: "💰" },
    { title: "Active Tables", value: stats.activeTables, icon: "🍽️" },
    { title: "Pending Orders", value: stats.pending, icon: "⏳" },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="stats-container">
        {statCards.map((stat, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="table-card">
        <div className="table-header">
          <h2>Live Table Status</h2>
          <button className="refresh-btn" onClick={loadDashboardData}>Refresh</button>
        </div>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Table No</th>
              <th>Status</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tables.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>No tables found</td></tr>
            ) : (
              tables.map((table) => (
                <tr key={table.id}>
                  <td><strong>{table.name || `Table ${table.id}`}</strong></td>
                  <td>
                    <span
                      className={
                        table.status === "Available"
                          ? "status available"
                          : "status occupied"
                      }
                    >
                      <span className="status-dot"></span>
                      {table.status}
                    </span>
                  </td>
                  <td>{table.type || '-'}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate("/dashboard/orders")}
                    >
                      Place Order
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table-card" style={{ marginTop: "30px" }}>
        <div className="table-header">
          <h2>Menu Overview</h2>
        </div>
        <div className="dashboard-menu-grid">
          {menu.length === 0 ? (
            <p style={{ padding: "20px", textAlign: "center", color: "#64748b" }}>No menu items found.</p>
          ) : (
            menu.slice(0, 8).map((item) => (
              <div key={item.id} className="dashboard-menu-item">
                <div className="menu-item-img">
                  {item.image ? <img src={item.image} alt={item.name} /> : <span className="placeholder">{item.name.charAt(0)}</span>}
                </div>
                <div className="menu-item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardTable;
