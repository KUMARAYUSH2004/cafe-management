import { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="page">
      <h2>Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>#</th>
              <th>Table No</th>
              <th>Total Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{order.table}</td>
                <td>₹{order.amount}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;


