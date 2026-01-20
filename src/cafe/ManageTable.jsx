import { useState, useEffect } from "react";
import "./ManageTable.css";

function ManageTable() {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    const savedTables = JSON.parse(localStorage.getItem("tables")) || [];
    setTables(savedTables);
  }, []);

  // Add table
  const addTable = () => {
    const newTable = {
      id: tables.length + 1,
      status: "Available",
    };

    const updatedTables = [...tables, newTable];
    setTables(updatedTables);
    localStorage.setItem("tables", JSON.stringify(updatedTables));
  };

  // Toggle status
  const toggleStatus = (id) => {
    const updatedTables = tables.map((table) =>
      table.id === id
        ? {
            ...table,
            status:
              table.status === "Available" ? "Occupied" : "Available",
          }
        : table
    );

    setTables(updatedTables);
    localStorage.setItem("tables", JSON.stringify(updatedTables));
  };

  return (
    <div className="table-container">
      <h2>Manage Tables</h2>

      <button className="add-btn" onClick={addTable}>
        + Add Table
      </button>

      <div className="table-grid">
        {tables.map((table) => (
          <div key={table.id} className="table-card">
            <h3>Table {table.id}</h3>
            <p
              className={
                table.status === "Available"
                  ? "status available"
                  : "status occupied"
              }
            >
              {table.status}
            </p>

            <button onClick={() => toggleStatus(table.id)}>
              Change Status
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageTable;
