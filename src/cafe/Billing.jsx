import { useState, useEffect } from "react";
import "./Billing.css";

function Billing() {
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const processedOrders = savedOrders.map(o => ({
      ...o,
      status: o.status || 'Pending',
      table: o.table || "Unknown"
    }));
    setBills(processedOrders);
  }, []);

  const updateLocalStorage = (updatedBills) => {
    setBills(updatedBills);
    localStorage.setItem("orders", JSON.stringify(updatedBills));
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice record?")) {
      const updated = bills.filter(b => b.id !== id);
      updateLocalStorage(updated);
    }
  };

  const handleStatusChange = (billId, newStatus, method = null) => {
    const updatedBills = bills.map(b =>
      b.id === billId ? { ...b, status: newStatus, paymentMethod: method } : b
    );
    updateLocalStorage(updatedBills);
    if (newStatus === "Paid") {
      const targetBill = bills.find(b => b.id === billId);
      if (targetBill && targetBill.table) {
        const savedTables = JSON.parse(localStorage.getItem("tables")) || [];
        const updatedTables = savedTables.map(t =>
          t.name === targetBill.table ? { ...t, status: 'Available' } : t
        );
        localStorage.setItem("tables", JSON.stringify(updatedTables));
      }
    }
  };

  const calculateTotalRevenue = () => {
    return bills
      .filter(b => b.status === "Paid")
      .reduce((acc, curr) => acc + curr.total, 0);
  };
  const filteredBills = bills.filter(bill => {
    const shortId = bill.id ? bill.id.toString().slice(-6) : "";
    const tableStr = bill.table ? bill.table.toString().toLowerCase() : "";
    const searchStr = searchTerm.toLowerCase();

    const matchesSearch =
      (bill.id && bill.id.toString().includes(searchStr)) ||
      shortId.includes(searchStr) ||
      tableStr.includes(searchStr);

    const matchesStatus = filterStatus === "All" || bill.status === filterStatus;
    return matchesSearch && matchesStatus;
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const openPaymentModal = (bill) => {
    setSelectedBill(bill);
    setPaymentMethod("Cash");
    setIsPaymentModalOpen(true);
  };

  const handleConfirmPayment = () => {
    if (selectedBill) {
      handleStatusChange(selectedBill.id, "Paid", paymentMethod);
      setIsPaymentModalOpen(false);
      setSelectedBill(null);
    }
  };

  const closeModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedBill(null);
  };

  return (
    <div className="billing-container">
      <header className="billing-header">
        <div>
          <h2>Billing & Transactions</h2>
          <p className="subtitle">Manage invoices and track revenue</p>
        </div>
        <div className="revenue-card">
          <span>Total Revenue</span>
          <h3>₹{calculateTotalRevenue()}</h3>
        </div>
      </header>


      <div className="billing-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by Table or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          {["All", "Pending", "Paid", "Void"].map(status => (
            <button
              key={status}
              className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
              onClick={() => setFilterStatus(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>


      <div className="table-wrapper">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Table</th>
              <th>Date & Time</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBills.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No transactions found</td>
              </tr>
            ) : (
              filteredBills.map((bill) => (
                <tr key={bill.id}>
                  <td>#{bill.id.toString().slice(-6)}</td>
                  <td>{bill.table}</td>
                  <td>{bill.date}</td>
                  <td>{bill.items.length} items</td>
                  <td className="amount">₹{bill.total}</td>
                  <td>
                    <span className={`status-pill ${bill.status.toLowerCase()}`}>
                      {bill.status}
                    </span>
                    {bill.paymentMethod && (
                      <div className="payment-method-tag">
                        {bill.paymentMethod === "Cash" ? "💵" : "📱"} {bill.paymentMethod}
                      </div>
                    )}
                  </td>
                  <td className="actions-cell">
                    {bill.status !== "Paid" && (
                      <button
                        className="btn-icon check"
                        title="Mark as Paid"
                        onClick={() => openPaymentModal(bill)}
                      >
                        ✓
                      </button>
                    )}
                    <button
                      className="btn-icon delete"
                      title="Delete"
                      onClick={() => handleDelete(bill.id)}
                    >
                      🗑️
                    </button>
                    <button className="btn-icon print" title="Print Receipt">
                      🖨️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedBill && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h3>Complete Payment</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            <div className="payment-details">
              <div className="bill-summary">
                <p><strong>Table:</strong> {selectedBill.table}</p>
                <p><strong>Total Amount:</strong> <span className="highlight-amount">₹{selectedBill.total}</span></p>
              </div>

              <div className="payment-method-selector">
                <label>Select Payment Method:</label>
                <div className="radio-group">
                  <label className={`radio-card ${paymentMethod === 'Cash' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      value="Cash"
                      checked={paymentMethod === "Cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>💵 Cash</span>
                  </label>
                  <label className={`radio-card ${paymentMethod === 'Online' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      value="Online"
                      checked={paymentMethod === "Online"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>📱 Online (UPI)</span>
                  </label>
                </div>
              </div>

              <div className="payment-visual">
                {paymentMethod === "Online" ? (
                  <div className="qr-code-container">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=shop&pn=Cafe&am=100" alt="Payment QR" />
                    <p>Scan to Pay Now</p>
                  </div>
                ) : (
                  <div className="cash-payment-info">
                    <div className="cash-icon">🤝</div>
                    <p>Please collect <strong>₹{selectedBill.total}</strong> from the customer.</p>
                  </div>
                )}
              </div>

              <button className="confirm-pay-btn" onClick={handleConfirmPayment}>
                Confirm Received (₹{selectedBill.total})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Billing;

