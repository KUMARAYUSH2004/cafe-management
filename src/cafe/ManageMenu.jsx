import { useState, useEffect } from "react";
import "./ManageMenu.css";

function ManageMenu() {
  const [menu, setMenu] = useState([]);
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);
  const [history, setHistory] = useState([]);

  // Load menu & history
  useEffect(() => {
    setMenu(JSON.parse(localStorage.getItem("menu")) || []);
    setHistory(JSON.parse(localStorage.getItem("menuHistory")) || []);
  }, []);

  // Save history
  const addHistory = (action, data) => {
    const record = {
      action,
      item: data.item,
      price: data.price,
      time: new Date().toLocaleString(),
    };

    const updatedHistory = [record, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("menuHistory", JSON.stringify(updatedHistory));
  };

  // Add / Update item
  const saveItem = () => {
    if (!item || !price) {
      alert("Enter item and price");
      return;
    }

    if (editId) {
      // UPDATE
      const updatedMenu = menu.map((m) =>
        m.id === editId ? { ...m, item, price } : m
      );
      setMenu(updatedMenu);
      localStorage.setItem("menu", JSON.stringify(updatedMenu));
      addHistory("Updated", { item, price });
      setEditId(null);
    } else {
      // ADD
      const newItem = {
        id: Date.now(),
        item,
        price,
      };
      const updatedMenu = [...menu, newItem];
      setMenu(updatedMenu);
      localStorage.setItem("menu", JSON.stringify(updatedMenu));
      addHistory("Added", newItem);
    }

    setItem("");
    setPrice("");
  };

  // Edit
  const editItem = (m) => {
    setItem(m.item);
    setPrice(m.price);
    setEditId(m.id);
  };

  // Delete
  const deleteItem = (id) => {
    const deleted = menu.find((m) => m.id === id);
    const updatedMenu = menu.filter((m) => m.id !== id);
    setMenu(updatedMenu);
    localStorage.setItem("menu", JSON.stringify(updatedMenu));
    addHistory("Deleted", deleted);
  };

  return (
    <div className="menu-page">
      <h2>Manage Menu</h2>

      {/* FORM */}
      <div className="menu-card">
        <input
          placeholder="Item name"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={saveItem}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* MENU LIST */}
      <div className="menu-card">
        <h3>Menu Items</h3>
        {menu.map((m) => (
          <div key={m.id} className="menu-row">
            <span>{m.item} – ₹{m.price}</span>
            <div>
              <button onClick={() => editItem(m)}>Edit</button>
              <button className="danger" onClick={() => deleteItem(m.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* HISTORY */}
      <div className="menu-card">
        <h3>History</h3>
        {history.length === 0 ? (
          <p>No history yet</p>
        ) : (
          <ul className="history">
            {history.map((h, i) => (
              <li key={i}>
                <b>{h.action}</b> {h.item} (₹{h.price}) – {h.time}
              
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ManageMenu;


