import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardTable.css";

const DashboardTable = () => {
   const [tables, setTables] = useState([]);
   const navigate = useNavigate()
   useEffect(() => {
    const savedTables =
      JSON.parse(localStorage.getItem("tables")) || [
  
  
    { id: 1, status: "Available", order: "-" },
    { id: 2, status: "Occupied", order: "" },
    { id: 3, status: "Available", order: "-" },
    { id: 4, status: "Occupied", order: "" },
  ];
 setTables(savedTables);
  }, []);


  return (
    <div className="table-container">
      <h2>Table Status</h2>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Table No</th>
            <th>Status</th>
            <th>Current Order</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tables.map((table) => (
            <tr key={table.id}>
              <td>{table.id}</td>
              <td>
                <span
                  className={
                    table.status === "Available"
                      ? "status available"
                      : "status occupied"
                  }
                >
                  {table.status}
                </span>
              </td>
              <td>{table.order}</td>
              <td>
                <button
  className="view-btn"
  onClick={() => navigate("/dashboard/orders")}
>
  View
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardTable;
