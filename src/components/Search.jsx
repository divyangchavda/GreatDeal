import React from "react";
import '../style/search.css';

function Search() {
    return (
        <div className="perform">
            
            <div   className='product-card' >
                    <img src="cart-img.png" alt='Product' className='product-image' />
                        <div className='product-info'>
                            <h2 className='product-title'>Essence Mascara Lash Princess</h2>
                            <p className='product-description'>The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.</p>
                            <p className='product-price'> 5999$</p>
                            <button className='cart-button'>Add to Cart</button>
                        </div>
            </div>
                         
            </div>   
    )
}
export default Search;