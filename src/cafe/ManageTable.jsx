import { useState, useEffect } from "react";
import "./ManageTable.css";

function ManageTable() {
  const [tables, setTables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTable, setNewTable] = useState({ name: "", capacity: "4", type: "Square" });

  useEffect(() => {
    const savedTables = JSON.parse(localStorage.getItem("tables")) || [
      { id: 1, name: "Table 1", capacity: 4, status: "Available", type: "Square" },
      { id: 2, name: "Table 2", capacity: 2, status: "Occupied", type: "Round" },
      { id: 3, name: "VIP 1", capacity: 6, status: "Reserved", type: "Rect" },
    ];
    setTables(savedTables);
  }, []);

  const saveToLocalStorage = (updatedTables) => {
    setTables(updatedTables);
    localStorage.setItem("tables", JSON.stringify(updatedTables));
  };

  const handleAddTable = () => {
    if (!newTable.name) return;

    const table = {
      id: Date.now(),
      name: newTable.name,
      capacity: parseInt(newTable.capacity),
      type: newTable.type,
      status: "Available",
    };

    saveToLocalStorage([...tables, table]);
    setNewTable({ name: "", capacity: "4", type: "Square" });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      const updated = tables.filter((t) => t.id !== id);
      saveToLocalStorage(updated);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = tables.map((t) =>
      t.id === id ? { ...t, status: newStatus } : t
    );
    saveToLocalStorage(updated);
  };

  // Helper to render seat icons
  const renderSeats = (count) => {
    return Array.from({ length: Math.min(count, 8) }).map((_, i) => (
      <span key={i} className="seat-dot" title="Seat"></span>
    ));
  };

  return (
    <div className="manage-wrapper">
      <header className="manage-header">
        <div>
          <h2>Manage Tables</h2>
          <p className="subtitle">Visualize and manage your floor plan</p>
        </div>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
          + Add New Table
        </button>
      </header>

      <div className="table-grid">
        {tables.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🪑</div>
            <h3>No tables yet</h3>
            <p>Start by adding your first table to the floor plan.</p>
          </div>
        ) : (
          tables.map((table) => (
            <div key={table.id} className={`manage-card ${table.status.toLowerCase()}`}>
              <div className="card-header">
                <span className="table-type-icon">{table.type === 'Round' ? '⚪' : '⬜'}</span>
                <h3>{table.name}</h3>
                <button className="delete-btn" onClick={() => handleDelete(table.id)}>×</button>
              </div>

              <div className="card-body">
                <div className="capacity-visual">
                  {renderSeats(table.capacity)}
                  {table.capacity > 8 && <span className="plus-seat">+{table.capacity - 8}</span>}
                </div>
                <p className="capacity-text">{table.capacity} Persons</p>

                <div className="status-control">
                  <select
                    value={table.status}
                    onChange={(e) => handleStatusChange(table.id, e.target.value)}
                    className={`status-select ${table.status.toLowerCase()}`}
                  >
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Cleaning">Cleaning</option>
                  </select>
                </div>

                <button className="qr-btn">
                  <span>📱 QR Code</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Table Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Add New Table</h3>

            <div className="form-group" style={{ marginBottom: '15px', textAlign: 'left' }}>
              <label>Table Name / Number</label>
              <input
                type="text"
                placeholder="e.g. Table 15"
                value={newTable.name}
                onChange={(e) => setNewTable({ ...newTable, name: e.target.value })}
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  min="1"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Shape</label>
                <select
                  value={newTable.type}
                  onChange={(e) => setNewTable({ ...newTable, type: e.target.value })}
                >
                  <option value="Square">Square</option>
                  <option value="Round">Round</option>
                  <option value="Rect">Rectangle</option>
                </select>
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddTable}>Save Table</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageTable;
