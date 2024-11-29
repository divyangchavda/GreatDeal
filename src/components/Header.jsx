import React,{useState} from 'react'
import '../style/Header.css'


import { useNavigate } from 'react-router-dom'

function Header() {
    const [isvisible,setIsvisible] =useState(false)
    const navigate = useNavigate();
    const onClickCart = () => {
        navigate('/Cartpage')
        console.log('cart clicked')
    }
    const onClickNoti = () => {
        navigate('/Notification')
    }
    const onClickSearch = () => {
        navigate('/Search')
    }
    // const onClickSignup = () => {
    //     navigate('/Signup')
    // }
    const OnClickLogout = () => {
        navigate('/Login')
    }
    function onShow(){
        setIsvisible(true);
    }
    function onHide(){
        setIsvisible(false);
    }
    return(
        <>
    <div className='header'>
        <div className='search-div'>
        <input type="text" placeholder="Search..." className="search-box" onClick={onClickSearch} />
        </div>
        <div  className='nav-div'>
        <ul className='nav-list'>
            <li><button  onClick={onClickCart}><i className="fa-solid fa-cart-shopping" ></i></button></li>
            <li><button onClick={onClickNoti}><i className="fa-solid fa-bell"></i></button></li>
            {/* <li><button><i className="fa-solid fa-bars"></i></button></li> */}
            <li><button onClick={onShow}><i className="fa-solid fa-user"></i></button></li>
        </ul>
        </div>
       
    </div>
    <div className={`profile-block ${isvisible?'show':'hide'}`}>
        <ul>
            <li onClick={onHide}>Close</li>
            <li><i class="fa-regular fa-user"> </i>Profile</li>
            <li onClick={OnClickLogout}><i class="fa-solid fa-right-from-bracket"> </i>Logout</li>
            
        </ul>

    </div>
    </>
    
    )
}
export default Header