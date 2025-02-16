import React,{useState} from "react";
import Header from "./Header";
import Performm from './Performm';
import Cartpage from "./Cartpage";

const Performcartpage =({cartItems ,setFilteredItems,setCartItems,setOrderHist,setAdminOrderList,logUserId})=>{
    const [showPanel,setShowPanel] = useState(false)
    return(
        <div>
             <Header setShowPanel={setShowPanel} />
   
            <Cartpage cartItems={cartItems} setCartItems={setCartItems}  logUserId={logUserId} setAdminOrderList={setAdminOrderList} setOrderHist={setOrderHist}/>
        </div>
    );
}
export default Performcartpage;