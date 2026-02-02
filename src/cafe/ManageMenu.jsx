import React, { useState } from "react";
import "./ManageMenu.css"; // Ensure CSS is imported

function MenuManagement() {
  // Initial Menu Data
  const defaultMenu = [
    // Coffee
    { id: 1, name: "Espresso", price: 120, category: "Coffee", image: "", enabled: true, tax: 5 },
    { id: 2, name: "Double Espresso", price: 160, category: "Coffee", image: "", enabled: true, tax: 5 },
    { id: 3, name: "Americano", price: 150, category: "Coffee", image: "", enabled: true, tax: 5 },
    { id: 4, name: "Cappuccino", price: 180, category: "Coffee", image: "", enabled: true, tax: 5 },
    { id: 5, name: "Latte", price: 190, category: "Coffee", image: "", enabled: true, tax: 5 },
    { id: 6, name: "Mocha", price: 210, category: "Coffee", image: "", enabled: true, tax: 5 },
    { id: 7, name: "Macchiato", price: 170, category: "Coffee", image: "", enabled: true, tax: 5 },
    { id: 8, name: "Flat White", price: 200, category: "Coffee", image: "", enabled: true, tax: 5 },
    { id: 9, name: "Irish Coffee", price: 250, category: "Coffee", image: "", enabled: true, tax: 5 },
    { id: 10, name: "Affogato", price: 220, category: "Coffee", image: "", enabled: true, tax: 5 },

    // Tea
    { id: 11, name: "Masala Chai", price: 80, category: "Tea", image: "", enabled: true, tax: 5 },
    { id: 12, name: "Ginger Tea", price: 90, category: "Tea", image: "", enabled: true, tax: 5 },
    { id: 13, name: "Green Tea", price: 100, category: "Tea", image: "", enabled: true, tax: 5 },
    { id: 14, name: "Lemon Tea", price: 90, category: "Tea", image: "", enabled: true, tax: 5 },
    { id: 15, name: "Earl Grey", price: 120, category: "Tea", image: "", enabled: true, tax: 5 },
    { id: 16, name: "Chamomile Tea", price: 130, category: "Tea", image: "", enabled: true, tax: 5 },
    { id: 17, name: "Iced Tea (Lemon)", price: 140, category: "Tea", image: "", enabled: true, tax: 5 },
    { id: 18, name: "Iced Tea (Peach)", price: 150, category: "Tea", image: "", enabled: true, tax: 5 },

    // Shakes & Smoothies
    { id: 19, name: "Classic Vanilla Shake", price: 180, category: "Shakes & Smoothies", image: "", enabled: true, tax: 5 },
    { id: 20, name: "Chocolate Shake", price: 200, category: "Shakes & Smoothies", image: "", enabled: true, tax: 5 },
    { id: 21, name: "Strawberry Smoothie", price: 210, category: "Shakes & Smoothies", image: "", enabled: true, tax: 5 },
    { id: 22, name: "Mango Smoothie", price: 220, category: "Shakes & Smoothies", image: "", enabled: true, tax: 5 },
    { id: 23, name: "Oreo Shake", price: 230, category: "Shakes & Smoothies", image: "", enabled: true, tax: 5 },
    { id: 24, name: "Cold Coffee", price: 190, category: "Shakes & Smoothies", image: "", enabled: true, tax: 5 },

    // Snacks
    { id: 25, name: "French Fries", price: 110, category: "Snacks", image: "", enabled: true, tax: 5 },
    { id: 26, name: "Peri Peri Fries", price: 130, category: "Snacks", image: "", enabled: true, tax: 5 },
    { id: 27, name: "Cheese Balls", price: 150, category: "Snacks", image: "", enabled: true, tax: 5 },
    { id: 28, name: "Garlic Bread", price: 140, category: "Snacks", image: "", enabled: true, tax: 5 },
    { id: 29, name: "Cheese Garlic Bread", price: 170, category: "Snacks", image: "", enabled: true, tax: 5 },
    { id: 30, name: "Nachos with Salsa", price: 180, category: "Snacks", image: "", enabled: true, tax: 5 },
    { id: 31, name: "Onion Rings", price: 160, category: "Snacks", image: "", enabled: true, tax: 5 },
    { id: 32, name: "Veg Nuggets", price: 140, category: "Snacks", image: "", enabled: true, tax: 5 },

    // Wraps & Burgers
    { id: 33, name: "Veg Burger", price: 150, category: "Wraps & Burgers", image: "", enabled: true, tax: 5 },
    { id: 34, name: "Cheese Burger", price: 180, category: "Wraps & Burgers", image: "", enabled: true, tax: 5 },
    { id: 35, name: "Paneer Burger", price: 200, category: "Wraps & Burgers", image: "", enabled: true, tax: 5 },
    { id: 36, name: "Chicken Burger", price: 220, category: "Wraps & Burgers", image: "", enabled: true, tax: 5 },
    { id: 37, name: "Veg Wrap", price: 160, category: "Wraps & Burgers", image: "", enabled: true, tax: 5 },
    { id: 38, name: "Paneer Wrap", price: 190, category: "Wraps & Burgers", image: "", enabled: true, tax: 5 },
    { id: 39, name: "Mexican Wars", price: 210, category: "Wraps & Burgers", image: "", enabled: true, tax: 5 },

    // Desserts
    { id: 40, name: "Chocolate Brownie", price: 120, category: "Desserts", image: "", enabled: true, tax: 5 },
    { id: 41, name: "Sizzling Brownie", price: 180, category: "Desserts", image: "", enabled: true, tax: 5 },
    { id: 42, name: "Blueberry Muffin", price: 100, category: "Desserts", image: "", enabled: true, tax: 5 },
    { id: 43, name: "Choco Chip Cookie", price: 80, category: "Desserts", image: "", enabled: true, tax: 5 },
    { id: 44, name: "Waffle with Honey", price: 150, category: "Desserts", image: "", enabled: true, tax: 5 },
    { id: 45, name: "Chocolate Waffle", price: 180, category: "Desserts", image: "", enabled: true, tax: 5 },
    { id: 46, name: "Ice Cream Scoop", price: 90, category: "Desserts", image: "", enabled: true, tax: 5 },

    // Combos
    { id: 47, name: "Burger + Coke", price: 199, category: "Combos", image: "", enabled: true, tax: 5 },
    { id: 48, name: "Pizza + Coke", price: 299, category: "Combos", image: "", enabled: true, tax: 5 },
    { id: 49, name: "Coffee + Cookie", price: 159, category: "Combos", image: "", enabled: true, tax: 5 },
    { id: 50, name: "Sandwich + Cold Coffee", price: 349, category: "Combos", image: "", enabled: true, tax: 5 },
  ];

  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem("cafe-menu");
    return saved ? JSON.parse(saved) : defaultMenu;
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
