// import React,{useState}from 'react'
// import Panel from './Panel'
// import Header from './Header'
// import Perform from './perform'
// import Cartpage from './cartPage'
// import Notification from './notification'
// import Search from './search'
// import Signup from './Signup'
// import Login from './Login'

// import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
// function Maincompo() {
//     const [filteredItems,setFilteredItems] = useState([]);
//     return (
//         <>
        
       
//         <Router>
            
                
            
    
            
            
      
//             <Routes>
//                     <Route path='/' element={<Signup />} />
//                     <Route path='/Login' element={<Login />} />
                  
//                                 <Route path='/Perform' element={<Header/>} />
//                                 <Route path='/Perform' element={<Panel setFilteredItems={setFilteredItems}/>} />
//                                 <Route path="/Perform" element={<Perform filteredItems={filteredItems} />}/> 
                       
//                 <Route path='/Cartpage' element={<Cartpage />} />
//                  <Route path='/Notification' element={<Notification />} /> 
//                 <Route path='/Search' element={<Search />} />
              
//             </Routes>
       
            
            
//         </Router>
//         </>
//     )
// }
// export default Maincompo
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Cartpage from './Cartpage';
import Notification from './Notification';
import Search from './Search';
import PerformPage from './Performpage' // Import the wrapper component

function Maincompo() {
    const [filteredItems, setFilteredItems] = useState([]);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Signup />} />
                <Route path='/Login' element={<Login />} />
                <Route
                    path='/Perform'
                    element={<PerformPage setFilteredItems={setFilteredItems} filteredItems={filteredItems} />}
                />
                
            </Routes>
        </Router>
    );
}

export default Maincompo;
