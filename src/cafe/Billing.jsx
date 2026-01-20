import { useParams } from "react-router-dom";
import { useState } from "react";
import "./Billing.css";

const menu = [
  { id: 1, name: "Coffee", price: 100 },
  { id: 2, name: "Tea", price: 50 },
  { id: 3, name: "Sandwich", price: 150 },
];

function Billing() {
  const { tableId } = useParams();
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    const found = cart.find(i => i.id === item.id);
    if (found) {
      setCart(
        cart.map(i =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty, 0
  );

  return (
    <>
      <h2>Billing – Table {tableId}</h2>

      <h3>Menu</h3>
      {menu.map(item => (
        <button key={item.id} onClick={() => addItem(item)}>
          {item.name} ₹{item.price}
        </button>
      ))}

      <h3>Order</h3>
      <ul>
        {cart.map(i => (
          <li key={i.id}>
            {i.name} x {i.qty} = ₹{i.price * i.qty}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{total}</h3>
    </>
  );
}

export default Billing;

