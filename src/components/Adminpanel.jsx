
import React,{useState,useEffect} from 'react'
import '../style/adminpanel.css';
import axios from 'axios';


function Adminpanel({setselectedItem,showPanel,search}) {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

    const [category,setCategory]=useState("All")
    const [data,setData]  = useState([]);

    useEffect(()=>{
    axios.get(`${API_BASE_URL}/api/product/Fetch`)
        .then((res)=>{
            
            const apiData=res.data.Products;
            setData(apiData);
        }).catch(()=>{
            console.log("error for fetching data")})
        },[]);
   
    
    useEffect(() => {
      const filteredItems = data.filter((item) => { 
        const filterByCategory = category === "All" || item.category.toLowerCase() === category.toLowerCase();
        const filterBySearch = 
          item.title.toLowerCase().includes(search.toLowerCase()) || 
          item.category.toLowerCase().includes(search.toLowerCase());
       

        return filterByCategory && filterBySearch;
      });
    
      setselectedItem(filteredItems);
    }, [category, data, search, setselectedItem]);
    
 
  return (
    <div className={`admin-Panel ${showPanel ? 'show' : 'hide'}`}>

       <div  className='admin-category' >
        <ul> 
        <li onClick={()=>setCategory("All")} >All</li>
          <li onClick={()=>setCategory("beauty")} >Beauty</li>
          <li onClick={()=>setCategory("fragrances")}>Fragrances</li>
          <li onClick={()=>setCategory("furniture")}>Furniture</li>
          <li onClick={()=>setCategory("groceries")}>Groceries</li>
          <li onClick={()=>setCategory("home-decoration")}>Home-Decoration</li>
          <li onClick={()=>setCategory("kitchen-accessories")}>Kitchen-Accessories</li>
          <li onClick={()=>setCategory("laptops")}>Laptops</li>
          <li onClick={()=>setCategory("mens-shirts")}>Mens-shirts</li>
          <li onClick={()=>setCategory("mens-shoes")}>Mens-shoes</li>
          <li onClick={()=>setCategory("mens-watches")}>Mens-Watches</li>
          <li onClick={()=>setCategory("mobile-accessories")}>Mobile-accessories</li>
          <li onClick={()=>setCategory("motorcycle")}>Motorcycle</li>
          <li onClick={()=>setCategory("skin-care")}>Skin-Care</li>
          <li onClick={()=>setCategory("smartphones")}>Smartphone</li>
          <li onClick={()=>setCategory("sports-accessories")}>Sports-accessories</li> 
          <li onClick={()=>setCategory("sunglasses")}>Sunglasses</li>
          <li onClick={()=>setCategory("tablets")}>Tablets</li>
          <li onClick={()=>setCategory("tops")}>Tops</li>
          <li onClick={()=>setCategory("vehicle")}>vehicle</li>
          <li onClick={()=>setCategory("womens-bags")}>Womens-bags</li>
          <li onClick={()=>setCategory("womens-dresses")}>Womens-Dresses</li>
          <li onClick={()=>setCategory("womens-jewellery")} >Women-Jewellery</li>
          <li onClick={()=>setCategory("womens-shoes")}>Women-shoes</li>
          <li onClick={()=>setCategory("womens-watches")}>Women-Watches</li>
          </ul>
      </div> 
    </div>
  )
}
export default Adminpanel;