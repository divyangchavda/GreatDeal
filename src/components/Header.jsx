import React,{useState} from 'react'
import '../style/Header.css'
import Panel from './Panel'
import axios from 'axios'


import { useNavigate } from 'react-router-dom'

function Header({setShowPanel,setSearch}) {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const [isvisible,setIsvisible] =useState(false)
    const navigate = useNavigate();
    const onClickCart = () => {
        navigate('/Performcartpage')
        console.log('cart clicked')
    }
     const onClickOrders = () => {
        navigate('/OrderHistory')
        console.log('orders clicked')
    }
   
    const onClickSearch = () => {
        navigate('/Search')
    }
    
    const OnClickGoHome = () => {
        navigate('/Perform')
    }
    const OnClickLogout = async() => {
            await axios.post(`${API_BASE_URL}/api/product/SessionDestroy`,{withCredentials:true})
        navigate('/Login')
    }
    function onShow(){
        setIsvisible(true);
    }
    function onHide(){
        setIsvisible(false);
    }
    const togglePanel = () => {
        setShowPanel((prev) => !prev); // Toggle visibility of Panel
      };
    function onClickProfile(){
        navigate('/Profilepage');
    }
    
    
    return(
 <>
    <div className='header'>
        <div className='search-div'>
            <button onClick={OnClickGoHome}>GreatDeals</button>
            <input type="text" placeholder="Search..." className="search-box" onChange={(e)=>setSearch(e.target.value)} />
        </div>

        <div  className='nav-div'>
            <ul className='nav-list'>
                <li><button onClick={()=>{togglePanel()}}><i className="fa-solid fa-bars">Category</i></button></li>
                <li><button onClick={onClickOrders}><i class="fa-duotone fa-solid fa-check fa-xl" >Orders</i></button></li>
                <li><button  onClick={onClickCart}><i className="fa-solid fa-cart-shopping" >Cart</i></button></li>
                {/* <li><button onClick={onClickNoti}><i className="fa-solid fa-bell"></i></button></li> */}
                <div>
                    <li><button onClick={onShow}><i className="fa-solid fa-user"></i></button></li>
                    <div className={`profile-block ${isvisible?'show':'hide'}`}>
                            <ul>
                                        <li onClick={onHide}>Close</li>
                                    <li onClick={onClickProfile}><i class="fa-regular fa-user"> </i>Profile</li>
                                        <li onClick={OnClickLogout}><i class="fa-solid fa-right-from-bracket"> </i>Logout</li>
            
                              </ul>

                </div>
                </div>
            </ul>
        </div>
       
    </div>
   
    </>
    
    )
}
export default Header