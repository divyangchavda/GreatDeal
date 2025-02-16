import React,{useState,useEffect} from "react";
import Adminheader from './Adminheader.jsx';
import '../style/adminheader.css'
import axios from "axios";
import "../style/AdminOrder.css";

function AdminOrder({}) {
    const [orders,setOrders]=useState([]);
    useEffect(() => {
      fetchOrders();
    }, []);
    // Function to fetch orders
    const fetchOrders = () => {
      axios
        .get("http://localhost:8000/api/product/OrderFetchAdmin")
        .then((res) => {
          console.log(res.data);
          setOrders(res.data); // Update state with latest data
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }; 
    // Function to update order status
    const updateOrderStatus = (orderId, itemId, newStatus) => {
      axios
        .put(`http://localhost:8000/api/product/updateOrderStatus/${orderId}`, {
          itemId, // Pass item ID to update specific item
          orderStatus: newStatus, // New status
        })
        .then((res) => {
          console.log("Order status updated:", res.data);
          // Update state to reflect changes
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? {
                    ...order,
                    orderItems: order.orderItems.map((item) =>
                      item._id === itemId
                        ? { ...item, orderStatus: newStatus }
                        : item
                    ),
                  }
                : order
            )
          );
        })
        .catch((error) => {
          console.error("Error updating order status:", error);
        });
    };
    return(
       
        <div>
            <Adminheader />
            <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Address</th>
              <th>Email</th>
              <th>Paid</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7">No orders found</td>
              </tr>
            ) : (
              orders.flatMap((order) =>
                order.orderItems.map((item, index) => (
                  <tr key={`${order._id}-${index}`}>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{item.title}</td>
                    <td>{order.shippingAddress?.address || "No Address"}</td>
                    <td>{order.user || "No User"}</td>
                    <td>{order.isPaid ? "✅ Online" : "❌ Offline"}</td>
                    <td>{item.orderStatus || "Pending"}</td>
                    <td>
                      <select
                        className="status-dropdown"
                        value={item.orderStatus || "Pending"}
                        onChange={(e) =>
                          updateOrderStatus(order._id, item._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Dispatch">Dispatch</option>
                        <option value="Deliver">Deliver</option>
                        <option value="Cancel">Cancel</option>
                      </select>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
         
        </div>

       
    )
}
export default AdminOrder;
