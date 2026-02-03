import React, { useState } from "react";
import "./ManageMenu.css"; // Ensure CSS is imported

import { defaultMenu } from "./menuData";

function MenuManagement() {
  // Initial Menu Data from imported file

  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem("cafe-menu");
    if (!saved) return defaultMenu;

    // Backfill missing images from defaultMenu if they exist
    const parsed = JSON.parse(saved);
    const updated = parsed.map(item => {
      if (!item.image || item.image.trim() === "") {
        const defaultItem = defaultMenu.find(d => d.id === item.id);
        if (defaultItem) {
          return { ...item, image: defaultItem.image };
        }
      }
      return item;
    });
    return updated;
  });

  // Save to LS whenever menu changes
  React.useEffect(() => {
    localStorage.setItem("cafe-menu", JSON.stringify(menu));

  }, [menu]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Coffee",
    image: "",
    tax: 0,
    enabled: true
  });

  // Handle Form Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Open Modal
  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({ name: "", price: "", category: "Coffee", image: "", tax: 0, enabled: true });
    }
    setIsModalOpen(true);
  };

  // Save Item
  const handleSave = () => {
    if (!formData.name || !formData.price) return alert("Please fill required fields");

    if (editingItem) {
      setMenu(menu.map((item) => (item.id === editingItem.id ? { ...formData, id: item.id } : item)));
    } else {
      setMenu([...menu, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  // Toggle Selection
  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Bulk Delete
  const handleBulkDelete = () => {
    setMenu(menu.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setIsDeleteModalOpen(false);
  };

  // Toggle Enabled Status
  const toggleItemStatus = (id) => {
    setMenu(
      menu.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  // Group by Category
  const categories = ["Coffee", "Tea", "Shakes & Smoothies", "Snacks", "Wraps & Burgers", "Desserts", "Combos"];

  return (
    <div className="manage-menu-container" style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Menu Management</h2>
        <button className="primary-btn" onClick={() => openModal()} style={{ padding: "10px 20px", background: "#3b82f6", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>
          + Add New Item
        </button>
      </header>

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="bulk-action-bar">
          <span>{selectedItems.length} items selected</span>
          <div className="bulk-buttons">
            <button className="danger" onClick={() => setIsDeleteModalOpen(true)}>Delete Selected</button>
            <button onClick={() => setSelectedItems([])}>Cancel</button>
          </div>
        </div>
      )}

      {/* Menu List */}
      <div className="menu-list">
        {categories.map((cat) => {
          const items = menu.filter((item) => item.category === cat);
          if (items.length === 0) return null;

          return (
            <div key={cat} className="category-group">
              <h4 className="category-title">{cat}</h4>
              <div className="menu-items">
                {items.map((item) => (
                  <div key={item.id} className="menu-item-card" style={{ display: "flex", alignItems: "center", padding: "15px", background: "white", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "10px" }}>
                    <input
                      type="checkbox"
                      className="item-checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />

                    <div className="menu-image">
                      {item.image ? <img src={item.image} alt={item.name} /> : <span className="placeholder-img">{item.name.charAt(0)}</span>}
                    </div>

                    <div className="menu-info">
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <h5 style={{ margin: 0, fontSize: "1rem" }}>{item.name}</h5>
                        {!item.enabled && <span style={{ fontSize: "0.75rem", background: "#cbd5e1", padding: "2px 6px", borderRadius: "4px" }}>Disabled</span>}
                      </div>
                      <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.9rem" }}>
                        ₹{item.price} <span className="tax-info">(+ {item.tax}% Tax)</span>
                      </p>
                    </div>

                    <div className="item-actions" style={{ display: "flex", gap: "10px" }}>
                      <button
                        className="action-btn"
                        onClick={() => toggleItemStatus(item.id)}
                      >
                        {item.enabled ? "Disable" : "Enable"}
                      </button>
                      <button
                        className="action-btn edit"
                        onClick={() => openModal(item)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="confirm-modal" style={{ width: "500px", textAlign: "left" }}>
            <h3 style={{ marginBottom: "20px" }}>{editingItem ? "Edit Item" : "Add New Item"}</h3>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Item Name</label>
                <input name="name" value={formData.name} onChange={handleChange} style={{ padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }} />
              </div>

              <div className="form-group">
                <label>Price (₹)</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} style={{ padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }} />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange} style={{ padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Tax (%)</label>
                <input type="number" name="tax" value={formData.tax} onChange={handleChange} style={{ padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }} />
              </div>

              <div className="form-group full-width">
                <label>Image URL</label>
                <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." style={{ padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }} />
                {formData.image && <img src={formData.image} alt="Preview" className="image-preview" />}
              </div>
            </div>

            <div className="modal-actions" style={{ marginTop: "25px", justifyContent: "flex-end" }}>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button onClick={handleSave} style={{ background: "#3b82f6", color: "white", border: "none" }}>Save Item</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete {selectedItems.length} items? This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
              <button className="danger-btn" onClick={handleBulkDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuManagement;
