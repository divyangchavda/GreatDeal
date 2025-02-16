
import React,{useState} from 'react'
import '../style/adminheader.css'



import { useNavigate } from 'react-router-dom'

function AdminHeader({setShowPanel,setSearch}) {
    
    const [isvisible,setIsvisible] =useState(false)
    const navigate = useNavigate();
   
   const onClickOrders = () => {
    navigate('/AdminOrder')
   }
    
    const onClickSearch = () => {
        navigate('/Search')
    }
    // const onClickSignup = () => {
    //     navigate('/Signuip')
    // }
   const onClickAdmin=()=>{
        navigate("/Admin");
        
   }
    
    const OnClickLogout = () => {
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
    
    return(
 <>
    <div className='admin-header'>
        <div className='search-div'>
            <h1><img src="logo1.png" alt=""  onClick={onClickAdmin} /></h1>
            <input type="text" placeholder="Search..." className="search-box" onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div  className='nav-div'>
            <ul className='nav-list'>
                {/* <li><button  className=''>{showPanle ? 'Hide panel' : 'Show panel'}<i className="fa-solid fa-bars"></i></button>{showPanle && <Panel />}</li> */}
                {/* <li><button onClick={showPanel} ><i className="fa-solid fa-bars"></i></button> </li> */}
                <li>
              <button onClick={()=>{togglePanel()}}>
                <i className="fa-solid fa-bars">Category</i>
              </button>
            </li>
            <li><button onClick={onClickOrders} ><i class="fa-duotone fa-solid fa-check fa-xl" >Orders</i></button></li>
           
             
                <li><button onClick={OnClickLogout}><i class="fa-solid fa-right-from-bracket">Logout</i></button></li>
            </ul>
        </div>
       
    </div>
    </>
    
    )
}
export default AdminHeader;