import React,{useState} from "react";
import Header from "./Header";
import Panel from "./Panel";
import Cartpage from "./Cartpage";

const PerformCartPage = () => {
    const [CartItems, setCartItems] = useState([]);
    return (
    <div>
      <Header />
      <Panel setFilteredItems={setCartItems} />
      <Cartpage filteredItems={CartItems} />
    </div>
  );
}