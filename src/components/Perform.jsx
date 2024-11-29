import React, { useEffect,useState } from 'react';
import '../style/perform.css'; 


function Perform({filteredItems}) {   
    function addtocart(e){ 
        console.log(e);
        
     }


    return (
        <div className="perform">
            {filteredItems.length > 0 ?(
            filteredItems.map((e,index) => 
            <div  key={index} className='product-card' >
                    <img src={e.images} alt='Product' className='product-image' />
                        <div className='product-info'>
                            <h2 className='product-title'>{e.title}</h2>
                            <p className='product-description'>{e.description}</p>
                            <p className='product-price'>{e.price} $</p>
                            <button onClick={()=>addtocart(e)} className='cart-button'>Add to Cart</button>
                        </div>
            </div>
                            )) 
                        : (
                        <h1><i class="fa fa-spinner" aria-hidden="true"></i></h1>
                       
                        
                    )}
            </div>   
        );
        }

export default Perform;
