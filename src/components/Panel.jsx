
import React,{useState,useEffect} from 'react'
import '../style/Panel.css'
import { getPost } from '../apif/getPost';
import { useNavigate } from 'react-router-dom'


function Panel({setFilteredItems}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [data,setData]  = useState([]);

  useEffect(()=>{
    getPost().then((data)=>{
      setData(data.products);
      setFilteredItems(data.products);
    });
  },[setFilteredItems]);

  useEffect(()=>{
    const filteredItems =selectedCategory==="All" 
    ?data
    :data.filter((item)=>item.category===selectedCategory);
    setFilteredItems(filteredItems);
  },[selectedCategory,data,setFilteredItems]);

  const Navigate = useNavigate();
  const onClickPanel = () => {
    Navigate('/Perform');
  }
  return (
    <div className='Panel'>
      <h1>Kharid le</h1>
       <div onClick={onClickPanel} className='category' >
        <h2>Category</h2>  
        <ul> 
          <li onClick={()=>setSelectedCategory("All")} >All</li>
          <li onClick={()=>setSelectedCategory("beauty")} >Beauty</li>
          <li onClick={()=>setSelectedCategory("fragrances")}>Fragrances</li>
          <li onClick={()=>setSelectedCategory("furniture")}>Furniture</li>
          <li onClick={()=>setSelectedCategory("groceries")}>Groceries</li>
          <li onClick={()=>setSelectedCategory("home-decoration")}>Home-Decoration</li>
          <li onClick={()=>setSelectedCategory("kitchen-accessories")}>Kitchen-Accessories</li>
          <li onClick={()=>setSelectedCategory("laptops")}>Laptops</li>
          <li onClick={()=>setSelectedCategory("mens-shirts")}>Mens-shirts</li>
          <li onClick={()=>setSelectedCategory("mens-shoes")}>Mens-shoes</li>
          <li onClick={()=>setSelectedCategory("mens-watches")}>Mens-Watches</li>
          <li onClick={()=>setSelectedCategory("mobile-accessories")}>Mobile-accessories</li>
          <li onClick={()=>setSelectedCategory("motorcycle")}>Motorcycle</li>
          <li onClick={()=>setSelectedCategory("skin-care")}>Skin-Care</li>
          <li onClick={()=>setSelectedCategory("smartphones")}>Smartphone</li>
          <li onClick={()=>setSelectedCategory("sports-accessories")}>Sports-accessories</li> 
          <li onClick={()=>setSelectedCategory("sunglasses")}>Sunglasses</li>
          <li onClick={()=>setSelectedCategory("tablets")}>Tablets</li>
          <li onClick={()=>setSelectedCategory("tops")}>Tops</li>
          <li onClick={()=>setSelectedCategory("vehicle")}>vehicle</li>
          <li onClick={()=>setSelectedCategory("womens-bags")}>Womens-bags</li>
          <li onClick={()=>setSelectedCategory("womens-dresses")}>Womens-Dresses</li>
          <li onClick={()=>setSelectedCategory("womens-jewellery")} >Women-Jewellery</li>
          <li onClick={()=>setSelectedCategory("womens-shoes")}>Women-shoes</li>
          <li onClick={()=>setSelectedCategory("womens-watches")}>Women-Watches</li>
          </ul>
      </div> 
    </div>
  )
}
export default Panel;