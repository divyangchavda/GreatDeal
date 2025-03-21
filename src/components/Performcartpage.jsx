import React,{useState} from "react";
import Header from "./Header";
import Performm from './Performm';
import Cartpage from "./Cartpage";

const Performcartpage =({cartItems ,setCartItems,setOrderHist,setAdminOrderList})=>{
    const [showPanel,setShowPanel] = useState(false)
    return(
        <div>
             <Header setShowPanel={setShowPanel} />
   
            <Cartpage cartItems={cartItems} setCartItems={setCartItems}   setAdminOrderList={setAdminOrderList} setOrderHist={setOrderHist}/>
        </div>
    );
}
export default Performcartpage;