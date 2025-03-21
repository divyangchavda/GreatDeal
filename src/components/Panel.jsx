import React, { useState, useEffect } from 'react';
import '../style/Panel.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Panel({ setFilteredItems, showPanel ,search,setCurrSelectedCategory,setShowPanel}) {
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default category is 'All'
  const [data, setData] = useState([]); // Holds the products fetched from the API
  const [btnshow, setBtnShow] = useState(false); // This state controls the visibility of the button (optional use case)
 

  useEffect(() => {
    // Fetch products from the API on component mount
    axios.get('http://localhost:8000/api/product/Fetch')
      .then((res) => {
        console.log(res.data.Products);
        setData(res.data.Products); // Set the products data from the response
        setFilteredItems(res.data.Products); // Initially set filtered items to all products
      })
      .catch(() => {
        console.log("Error fetching data");
      });
  }, [setFilteredItems]);
  useEffect(() => {
    if(setShowPanel){
      setShowPanel(false);
    }
  },[selectedCategory])
  useEffect(() => {
   
      const filteredItems=data.filter((item)=>{
      const filtebycategory =selectedCategory==="All"?data:item.category.toLowerCase() === selectedCategory.toLowerCase()
      const filtebysearch= item.title.toLowerCase().includes(search.toLowerCase())  || item.category.toLowerCase().includes(search.toLowerCase())
      return filtebycategory && filtebysearch })
      setFilteredItems(filteredItems);

    setCurrSelectedCategory(selectedCategory);
     // Update filtered items in parent component
  }, [selectedCategory, data,search,setCurrSelectedCategory, setFilteredItems]);

  const Navigate = useNavigate(); // Navigate for routing to other pages

  const onClickPanel = () => {
    Navigate('/Perform'); // Redirect user to the Perform page when panel is clicked
  };

  function onShow() {
    setBtnShow(true); // Show button (this seems to be an optional feature)
  }

  function onHide() {
    setShowPanel(false); // Hide button (optional)
  }

  return(
    <>
    <div className={`Panel ${showPanel ? 'show' : 'hide'}`}>
        {/* Show the panel only if 'isvisible' state is true */}
      <div onClick={onClickPanel} className='category'>
         
        <ul>
            <li onClick={onHide}>Close</li>
          <li onClick={()=>{setSelectedCategory("All")}}>All</li>
          <li onClick={()=>{setSelectedCategory("beauty")}}>Beauty</li>
          <li onClick={()=>{setSelectedCategory("fragrances")}}>Fragrances</li>
          <li onClick={()=>{setSelectedCategory("furniture")}}>Furniture</li>
          <li onClick={()=>{setSelectedCategory("groceries")}}>Groceries</li>
          <li onClick={()=>{setSelectedCategory("home-decoration")}}>Home-Decoration</li>
          <li onClick={()=>{setSelectedCategory("kitchen-accessories")}}>Kitchen-Accessories</li>
          <li onClick={()=>{setSelectedCategory("laptops")}}>Laptops</li>
          <li onClick={()=>{setSelectedCategory("mens-shirts")}}>Mens-shirts</li>
          <li onClick={()=>{setSelectedCategory("mens-shoes")}}>Mens-shoes</li>
          <li onClick={()=>{setSelectedCategory("mens-watches")}}>Mens-Watches</li>
          <li onClick={()=>{setSelectedCategory("mobile-accessories")}}>Mobile-accessories</li>
          <li onClick={()=>{setSelectedCategory("motorcycle")}}>Motorcycle</li>
          <li onClick={()=>{setSelectedCategory("skin-care")}}>Skin-Care</li>
          <li onClick={()=>{setSelectedCategory("smartphones")}}>Smartphone</li>
          <li onClick={()=>{setSelectedCategory("sports-accessories")}}>Sports-accessories</li> 
          <li onClick={()=>{setSelectedCategory("sunglasses")}}>Sunglasses</li>
          <li onClick={()=>{setSelectedCategory("tablets")}}>Tablets</li>
          <li onClick={()=>{setSelectedCategory("tops")}}>Tops</li>
          <li onClick={()=>{setSelectedCategory("vehicle")}}>vehicle</li>
          <li onClick={()=>{setSelectedCategory("womens-bags")}}>Womens-bags</li>
          <li onClick={()=>{setSelectedCategory("womens-dresses")}}>Womens-Dresses</li>
          <li onClick={()=>{setSelectedCategory("womens-jewellery")}} >Women-Jewellery</li>
          <li onClick={()=>{setSelectedCategory("womens-shoes")}}>Women-shoes</li>
          <li onClick={()=>{setSelectedCategory("womens-watches")}}>Women-Watches</li>
           
          </ul>
        </div>
      </div>
    </>
  );

}
export default Panel;
