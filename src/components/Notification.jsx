import React from   'react';
import '../style/notification.css';



function Notification() {
   
    return(
        <div className='cart-main-div'>
            
            
                <div  className='cart-item'>
                    <div className='cart-image-div'>
                        <img src="cart-img.png" alt='Product' className='cart-image' />
                    </div>
                    <div className='cart-info-div'>
                        <h2 className='cart-title'>Essence Mascara Lash Princess</h2>
                        <p className='cart-description'>The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.</p>
                        <p className='cart-price' >54545 $</p>
                    </div>
                    <div className='cart-button-div'>
                        <h2>HAPPY SUNDAY OFFER <b>30% OFF</b></h2>
                        <button className='cart-button'>Add To Cart</button>
                    </div>
                </div>

                {<div  className='cart-item'>
                    <div className='cart-image-div'>
                        <img src="cart-img.png" alt='Product' className='cart-image' />
                    </div>
                    <div className='cart-info-div'>
                        <h2 className='cart-title'>Essence Mascara Lash Princess</h2>
                        <p className='cart-description'>The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.</p>
                        <p className='cart-price' >54545 $</p>
                    </div>
                    <div className='cart-button-div'>
                        <h2>HAPPY SUNDAY OFFER <b>20% OFF</b></h2>
                        <button className='cart-button'>Add To Cart</button>
                    </div>
                </div> }

                { <div  className='cart-item'>
                    <div className='cart-image-div'>
                        <img src="cart-img.png" alt='Product' className='cart-image' />
                    </div>
                    <div className='cart-info-div'>
                        <h2 className='cart-title'>Essence Mascara Lash Princess</h2>
                        <p className='cart-description'>The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.</p>
                        <p className='cart-price' >54545 $</p>
                    </div>
                    <div className='cart-button-div'>
                        <h2>HAPPY SUNDAY OFFER <b>99% OFF</b></h2>
                        <button className='cart-button'>Add To Cart</button>
                    </div>
                </div> }

                { <div  className='cart-item'>
                    <div className='cart-image-div'>
                        <img src="cart-img.png" alt='Product' className='cart-image' />
                    </div>
                    <div className='cart-info-div'>
                        <h2 className='cart-title'>Essence Mascara Lash Princess</h2>
                        <p className='cart-description'>The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.</p>
                        <p className='cart-price' >54545 $</p>
                    </div>
                    <div className='cart-button-div'>
                        <h2>HAPPY SUNDAY OFFER <b>110% OFF</b></h2>
                        <button className='cart-button'>Add To Cart</button>
                    </div>
                </div> }
        </div>

            
     
    )
}
export default Notification;