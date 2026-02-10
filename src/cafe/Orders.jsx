import { useState, useEffect } from "react";
import "./Orders.css";

import { defaultMenu } from "./menuData";

function Orders() {
  const [menu, setMenu] = useState([]);
  const [tables, setTables] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTable, setSelectedTable] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  useEffect(() => {
    const savedMenu = JSON.parse(localStorage.getItem("cafe-menu")) || [];
    const savedTables = JSON.parse(localStorage.getItem("tables")) || [];
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
    setTables(savedTables);
  }, []);
  const categories = ["All", ...new Set(menu.map((item) => item.category))];
  const filteredMenu =
    selectedCategory === "All"
      ? menu
      : menu.filter((item) => item.category === selectedCategory);
  const addToCart = (item) => {
    const existing = cart.find((cartItem) => cartItem.id === item.id);
    if (existing) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.05); // 5% tax assumption
  const total = subtotal + tax;
  const handlePlaceOrder = () => {
    if (cart.length === 0) return alert("Cart is empty!");
    if (!selectedTable) return alert("Please select a table!");

    const newOrder = {
      id: Date.now(),
      table: selectedTable,
      items: cart,
      subtotal,
      tax,
      total,
      date: new Date().toLocaleString(),
      status: "Preparing"
    };
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([newOrder, ...existingOrders]));
    const updatedTables = tables.map(t =>
      t.name === selectedTable ? { ...t, status: 'Occupied' } : t
    );
    localStorage.setItem("tables", JSON.stringify(updatedTables));
    setTables(updatedTables); // Reflect locally
    setCart([]);
    setSelectedTable("");
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  return (
    <div className="pos-container">
      {/* Left: Menu Section */}
      <div className="menu-section">
        <header className="pos-header">
          <h2>Take Order</h2>
          <div className="category-scroll">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="menu-grid">
          {filteredMenu.map(item => (
            <div key={item.id} className="pos-item-card" onClick={() => addToCart(item)}>
              <div className="item-img-placeholder">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  item.name.charAt(0)
                )}
              </div>
              <div className="item-details">
                <h4>{item.name}</h4>
                <span className="price">₹{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Cart Section */}
      <div className="cart-section">
        <div className="cart-header">
          <h3>Current Order</h3>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="table-select"
          >
            <option value="">Select Table</option>
            {tables.filter(t => t.name).map(t => (
              <option key={t.id} value={t.name}>
                {t.name} - {t.status}
              </option>
            ))}
          </select>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart-msg">Cart is empty</div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <b>{item.name}</b>
                  <span>₹{item.price * item.quantity}</span>
                </div>
                <div className="qty-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="bill-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="bill-row">
            <span>Tax (5%)</span>
            <span>₹{tax}</span>
          </div>
          <div className="bill-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="place-order-btn" onClick={handlePlaceOrder}>
            {orderSuccess ? "Order Placed! ✅" : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Orders;


