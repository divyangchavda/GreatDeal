import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import PerformPage from './Performpage' // Import the wrapper component
import Performcartpage from './Performcartpage' // Import the wrapper component

import Admin from './Admin';
import OrderHistory from './OrderHistory';
import AdminOrder from './AdminOrder';
import Profilepage from './Profilepage';

function Maincompo() {
    const [filteredItems, setFilteredItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    
    const [adminOrderList,setAdminOrderList]=useState([]);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Signup />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Admin' element={<Admin />}/>
                <Route
                    path='/Perform'
                    element={<PerformPage setFilteredItems={setFilteredItems} filteredItems={filteredItems} setCartItems={setCartItems} />}
                />
            < Route path='/Performcartpage' element={< Performcartpage  cartItems={cartItems} setAdminOrderList={setAdminOrderList}setFilteredItems={setFilteredItems}  setCartItems={setCartItems} />}/>
            <Route path='/OrderHistory' element={<OrderHistory  />}/>
            <Route path='AdminOrder' element={<AdminOrder adminOrderList={adminOrderList}/>}/>
            <Route path="Profilepage" element={<Profilepage />} />
                
            </Routes>
        </Router>
    );
}

export default Maincompo;
