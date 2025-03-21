import React, { useState, useEffect } from "react";
import Header from "./Header";
import "../style/OrderHistory.css";
import axios from "axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios
      .post(`http://localhost:8000/api/product/OrderFetchIndividual`,{},{withCredentials:true})
      .then((res) => {
        console.log(res.data);
        const orderData = res.data;
        const finalOrder = orderData.flatMap(order =>
          order.orderItems.map(item => ({
            ...item,
            orderId: order._id, // Attach order ID for update reference
            createdAt: order.createdAt, // Include order creation date
            shippingAddress: order.shippingAddress, // Include address
            user: order.user, // Include user details
            isPaid: order.isPaid // Include payment status
          }))
        );
        setOrders(finalOrder);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleStatusChange = async (orderId, orderItemId, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:8000/api/product/OrderUpdate/${orderId}`, {
        orderItemId: orderItemId, // Pass orderItemId in the request body
        orderStatus: newStatus    // New status from the dropdown+
      });

      if (res.status === 200) {
        setOrders(prevOrders =>
          prevOrders.map(item =>
            item._id === orderItemId ? { ...item, orderStatus: newStatus } : item
          )
        );
        console.log("Order status updated successfully");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const generateBill = (order) => {
    const billContent = `
        Order ID: ${order.orderId}
        Product: ${order.title}
        Price: $${order.price}
        Address: ${order.shippingAddress?.address || "No Address"}
        Email: ${order.user || "No User"}
        Payment: ${order.isPaid ? "✅ Online" : "❌ Offline"}
        Status: ${order.orderStatus}
    `;

    const blob = new Blob([billContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Bill_${order.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  return (
    <div>
      <Header />
      <div className="order-card-container">
        {orders.length === 0 ? (
          <h2>No orders found</h2>
        ) : (
          orders.map((item, index) => (
            <div key={`${item.orderId}-${index}`} className="order-card">
                <div className="order-card-header">
                <div className="order-product-image">
                        <img src={item.images[0]} alt="Product" />
                    </div>
                    
                </div>
                
                <div className="order-card-body">
                    {/* 🖼️ Product Image */}
                    <span className="order-date">
                        {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <span className={`order-status ${item.orderStatus.toLowerCase()}`}>
                        {item.orderStatus}
                    </span>
        
                    <div className="order-product">
                        <h3>{item.title}</h3>
                    </div>
        
                    <div className="order-details">
                        <p><strong>Address:</strong> {item.shippingAddress?.address || "No Address"}</p>
                        <p><strong>Email:</strong> {item.user || "No User"}</p>
                        <p><strong>Paid:</strong> {item.isPaid ? "✅ Online" : "❌ Offline"}</p>
                    </div>
                </div>
        
                <div className="order-card-footer">
    {item.orderStatus !== "Cancel" ? (
        <button className="cancel-button"  onClick={() => handleStatusChange(item.orderId, item._id, "Cancel")} >
          Cancel Order
        </button>
       
    
    ) : (
        <span className="cancelled-text">Order Cancelled</span>
    )}
     <button
        className="generate-bill-button"  onClick={() => generateBill(item)} >  Generate Bill
    </button>
</div>

            </div>
        ))
        
          
        )}
      </div>
    </div>
  );
}

export default OrderHistory;
