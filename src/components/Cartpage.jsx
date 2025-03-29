import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/cartPage.css'; 
import axios from 'axios';


function Cartpage({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [address, setAddress] =useState("");
    const [showAddress, setShowAddress] = useState(false); 
    const API_BASE_URL = import.meta.env.VITE_API_URL; // Base URL for API requests
    const remove = (id) => {
        let newCart = cartItems.filter((e) => e._id !== id);
        setCartItems(newCart);
    };
    // const OrderHist = (e) => {
    //     setOrderHist((prev) => [...prev, e]);
        
    // };
  

    useEffect(() => {
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            total += cartItems[i].price;
        }
        setTotalPrice(total);
    }, [cartItems]);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const Payment = async () => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/api/product/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: totalPrice * 100, currency: 'INR', receipt: 'receipt#1', notes: {} })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const order = await response.json();

            const options = {
                key: 'rzp_test_xUKFyh6seivMEO', // Ensure this key is correct
                amount: order.amount,
                currency: 'INR',
                name: 'Great Deal',
                description: 'Test Transaction',
                order_id: order.id, // This is the order_id created in the backend
                prefill: {
                    name: 'Jay Sharma',
                    email: 'jaysharmadec2002@gmail.com',
                    contact: '7720964387'
                },
                theme: {
                    color: '#F37254'
                },handler: async function (response) {
                    try {
                        // Fetch user ID (modify as needed)
                    
                        
                        if (cartItems.length === 0) {
                            console.error("Cart is empty");
                            alert("Your cart is empty!");
                            return;
                        }
                        if (!address) {
                            console.error("Address is required");
                            alert("Please enter your address!");
                            return;
                        }
                        // Structure orderItems correctly
                        const orderItems = cartItems.map(item => ({
                            title: item.title,
                            qty: 1, // If quantity is not stored, default to 1
                            price: item.price,
                            images: item.images[0],
                            product: item._id ,
                            orderStatus:"placed" // Assuming product ID is stored as _id
                        }));
                
                        // Construct order data
                        const orderData = {
                         
                            orderItems,
                            shippingAddress: { 
                                address, 
                                city: "YourCity", // Replace with actual city input
                                postalCode: "123456", // Replace with actual postal code input
                                country: "YourCountry" // Replace with actual country input
                            },
                            isPaid: true // Since payment is successful
                        };
                        console.log("sending order data",orderData);
                        try {
                        const res = await axios.post(`${API_BASE_URL}/api/product/OrderData`, orderData ,{withCredentials:true});
                        } catch (error) {
                            console.error('Error sending order data to the server:', error);
                        }
                        console.log("✅ Order Created Successfully:", res.data);
                        // const res = await axios.post('http://localhost:8000/api/product/OrderData', orderData);
                
                        if (res.status === 201) {
                            alert("Order placed successfully!");
                            setCartItems([]); // Clear cart after successful order
                            navigate("/OrderHistory"); // Redirect to order history
                            
                          
                        }
                    } catch (error) {
                        console.error('Error sending order data to the server:', error);
                    }
                },
                config: {
                    display: {
                        blocks: {
                            banks: {
                                name: 'All Payment Options',
                                instruments: [
                                    {
                                        method: 'upi'
                                    },
                                    {
                                        method: 'card'
                                    }
                                ]
                            }
                        }
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

   
    return (
        <div className='cart-main-div'>
            <div className='Address-div'>
            <input 
                    type="text" 
                    name="Address" 
                    placeholder='Enter your Address' 
                    className='Address-input' 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    onBlur={() => setShowAddress(true)} // Show address when input loses focus
                />
                {showAddress && address && <p>{address}</p>}
            </div>
          <div className='cart-scroll'>
            {cartItems.length > 0 ?(

            cartItems.map((e,index) => 
                <div  className='cart-item' key={index} >
                    <div className='cart-image-div'>
                        <img src={e.images[0]} alt='Product' className='cart-image' />
                    </div>
                    <div className='cart-info-div'>
                        <h2 className='cart-title'>{e.title}</h2>
                        <p className='cart-description'>{e.description}</p>
                        <p className='cart-price' >{e.price} ₹</p>
                    </div>
                    <div className='remove-button-div'>
                        <button onClick={()=>remove(e._id)} className='remove-btn'>Remove</button>
                    </div>
                </div>
                            )) 
                        : (

                        <h1><i class="fa fa-shopping-cart" aria-hidden="true"></i></h1>
       
                    )}
                     </div>

                <div className='payment-div'>
                        <p>Total: {Math.floor(totalPrice * 100) / 100} ₹</p>
                        <button  onClick={(Payment)}>PAYMENT</button> 
                      
                    
                <div/>  

          </div>
               
            
            
                
        </div>
    )
}
export default Cartpage;