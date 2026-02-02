import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardTable.css";

const DashboardTable = () => {
  const [tables, setTables] = useState([]);
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    activeTables: 0,
    pending: 0
  });
  const navigate = useNavigate();

  const loadDashboardData = () => {
    // Load Tables
    const savedTables = JSON.parse(localStorage.getItem("tables")) || [];
    setTables(savedTables);

    // Load Orders
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Calculate Stats
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
    // Refresh every 30 seconds to keep dashboard alive
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
    </div>
  );
}

export default DashboardTable;
