import React,{useState,useEffect} from "react";
import Adminheader from './Adminheader.jsx';
import axios from "axios";
import "../style/AdminOrder.css";

function AdminOrder({}) {
    const [orders,setOrders]=useState([]);
    const [filteredOrders,setFilteredOrders]=useState([]);
    const [date,setDate]=useState();
    const [option,setOption]=useState();
    const API_BASE_URL = import.meta.env.VITE_API_URL;
// Base URL for API requests
  
    useEffect(() => {
      fetchOrders();
    
      
    }, []);
    
    // Function to fetch orders
    const fetchOrders = () => {
      axios
        .get(`${API_BASE_URL}/api/product/OrderFetchAdmin`)
        .then((res) => {
          console.log(res.data);
          
          setOrders(res.data); // Update state with latest data
          setFilteredOrders(res.data);

        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }; 
    const updateOrderStatus= async (OrderFetchIndividual,orderItemId,newStatus)=>{
        try{
            const res=await axios.put(`${API_BASE_URL}/api/product/OrderUpdate/${OrderFetchIndividual}`,{
                orderItemId:orderItemId,
                orderStatus:newStatus
            });
            if(res.status===200){
                setOrders((prevOrders)=>
                prevOrders.map(item=>
                item._id===orderItemId?{...item,orderStatus:newStatus}:item
                )
                );
                console.log("Order status updated successfully");
            }
        }catch(error){
            console.error("Error updating order status:",error);
        }
    }
 
  
  useEffect(() => {
    console.log("Date:", date);
    console.log("Option:", option);
  
    if (date || option) {
      const currentDate = date ? new Date(date).toLocaleDateString() : null;
      console.log("Current Date:", currentDate);
  
      const filteredOrders = orders
        .map((order) => {
          const backendDate = new Date(order.createdAt).toLocaleDateString();
          const filteredByDate = date ? backendDate === currentDate : true;
  
          // Filter order items based on selected status
          const filteredItems = option
            ? order.orderItems.filter((item) => item.orderStatus === option)
            : order.orderItems;
  
          if (filteredItems.length === 0 || !filteredByDate) return null; // Skip orders if no match
  
          return {
            ...order,
            orderItems: filteredItems,
          };
        })
        .filter(Boolean); // Remove null values (orders that didn't match)
  
      console.log("Filtered Orders:", filteredOrders);
      setFilteredOrders(filteredOrders);
    } else {
      setFilteredOrders(orders);
    }
  }, [date, orders, option]);
  




    return(
       
        <div>
            <Adminheader />
            <div className="order">
             
              <div className="Adminorder">
                  <button onClick={()=>{setFilteredOrders(orders);setDate();setOption();}} className="showorder">Show&nbsp;All</button>
                  <div className="datecontainer">
                      <label>Date</label>
                      <input type="date"  onChange={(e)=>setDate(e.target.value)} className="dateinput"></input>
                  </div>
                  <div className="statuscontainer">
                      <label>Status</label>
                      <select onChange={(e)=>setOption(e.target.value)} className="option">
                          <option value="" className="option">All</option>
                          <option value="placed" className="option">Placed</option>
                          <option value="Dispatched" className="option">Dispatched</option>
                          <option value="delivered" className="option">Delivered</option>
                          <option value="Cancel" className="option">Cancelled</option>
                      </select>
                  </div>
              </div>
          </div>
  
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
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="7">No orders found</td>
              </tr>
            ) : (
              filteredOrders.flatMap((order) =>
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
                        <option value="Dispatched">Dispatch</option>
                        <option value="delivered">Deliver</option>
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
