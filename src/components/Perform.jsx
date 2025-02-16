// import React, { useEffect,useState } from 'react';
// import '../style/perform.css'; 


// function Perform({ filteredItems, setCartItems ,search ,currselectedCategory}) { 
//     const [selectedProduct, setSelectedProduct] = useState(null);  
//     const addtocart = (e) => {
//         setCartItems((prev) => [...prev, e]);
        
//     };
//     console.log("ff",currselectedCategory)

//     return (
//         <div className="perform">
            
//         <div className='perform-container'>
//             {filteredItems.length > 0 ?(
//             filteredItems.map((e) => 
//             <div  key={e._id} className='product-card'onClick={() => setSelectedProduct(product)} >
//                     <img src={e.images} alt='Product' className='product-image' />
//                         <div className='product-info'>
//                             <h2 className='product-title'>{e.title}</h2>
//                             <p className='product-description'>{e.description}</p>
//                             <p className='product-price'>₹{e.price}</p>
//                             <button onClick={()=>addtocart(e)} className='cart-button'>Cart<i className="fa-solid fa-cart-shopping" ></i></button>
//                         </div>
//             </div>
//                             )) 
//                         : (
//                         <h1><i class="fa fa-spinner" aria-hidden="true"></i></h1>
                       
                        
//                     )}
//                     </div>
//                      {/* Modal for product details */}
//             {selectedProduct && (
//                 <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="close-button" onClick={() => setSelectedProduct(null)}>✖</button>
//                         <img src={selectedProduct.images} alt="Product" className="modal-image" />
//                         <h2>{selectedProduct.title}</h2>
//                         <p className="modal-description">{selectedProduct.description}</p>
//                         <p className="modal-price"><strong>Price:</strong> ₹{selectedProduct.price}</p>
//                     </div>
//                 </div>
//             )}
//             </div>   
//         );
//         }
    
// // export default Perform;
// import React, { useState } from 'react';
// import '../style/perform.css'; 

// function Perform({ filteredItems, setCartItems }) {   
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     const addToCart = (product) => {
//         setCartItems((prev) => [...prev, product]);
//     };

//     return (
//         <div className="perform">
//             <div className="perform-container">
//                 {filteredItems.length > 0 ? (
//                     filteredItems.map((product) => (
//                         <div key={product._id} className="product-card" onClick={() => setSelectedProduct(product)}>
//                             <img src={product.images} alt="Product" className="product-image" />
//                             <div className="product-info">
//                                 <h2 className="product-title">{product.title}</h2>
//                                 <p className="product-price">₹{product.price}</p>
//                                 <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="cart-button">
//                                     Cart <i className="fa-solid fa-cart-shopping"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <h1><i className="fa fa-spinner" aria-hidden="true"></i></h1>
//                 )}
//             </div>

//             {/* Modal for product details */}
//             {selectedProduct && (
//                 <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="close-button" onClick={() => setSelectedProduct(null)}>✖</button>
//                         <img src={selectedProduct.images} alt="Product" className="modal-image" />
//                         <h2>{selectedProduct.title}</h2>
//                         <p className="modal-description">{selectedProduct.description}</p>
//                         <p className="modal-price"><strong>Price:</strong> ₹{selectedProduct.price}</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Perform;

import React, { useState, useEffect } from 'react';
import '../style/perform.css';

function Perform({ filteredItems, setCartItems }) {   
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0);

    const carouselImages = [
        "c1.jpg",
        "c2.jpg",
        "c4.jpg"
    ];

    // Auto-slide images every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prevIndex) =>
                prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Open Modal with Product Data
    const openModal = (product) => {
        setSelectedProduct(product);
        setCurrentImageIndex(0);
    };

    // Close Modal
    const closeModal = () => {
        setSelectedProduct(null);
    };

    // Navigate Images in the Slider
    const nextImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === selectedProduct.images.length - 1 ? 0 : prevIndex + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedProduct) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? selectedProduct.images.length - 1 : prevIndex - 1
            );
        }
    };

    const addToCart = (item) => {
        setCartItems((prev) => [...prev, item]);
    };

    return (
        <div className="perform">
            {/* 🔥 Carousel Section */}
            <div className="carousel">
                <button className="carousel-button left" onClick={() => 
                    setCarouselIndex(prev => prev === 0 ? carouselImages.length - 1 : prev - 1)
                }>
                    &#10094;
                </button>
                <img src={carouselImages[carouselIndex]} alt="Carousel Slide" className="carousel-image" />
                <button className="carousel-button right" onClick={() => 
                    setCarouselIndex(prev => prev === carouselImages.length - 1 ? 0 : prev + 1)
                }>
                    &#10095;
                </button>
            </div>

            {/* Product Section */}
            <div className='perform-container'>
                {filteredItems.length > 0 ? (
                    filteredItems.map((product) => 
                        <div key={product._id} className='product-card' onClick={() => openModal(product)}>
                            <img src={product.images[0]} alt='Product' className='product-image'  />
                            <div className='product-info'>
                                <h2 className='product-title'>{product.title}</h2>
                                {/* <p className='product-description'>{product.description}</p> */}
                                <p className='product-price'>₹{product.price}</p>
                                <button onClick={(e) => {e.stopPropagation(); addToCart(product)}} className='cart-button'>
                                    Cart <i className="fa-solid fa-cart-shopping"></i>
                                </button>
                            </div>
                        </div>
                    )
                ) : (
                    <h1><i className="fa fa-spinner" aria-hidden="true"></i></h1>
                )}
            </div>

            {/* Modal Popup */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-button" onClick={closeModal}>X</button>
                        
                        {/* Image Slider */}
                        <div className="image-slider">
                            <button className="prev-button" onClick={prevImage}>&#10094;</button>
                            <img src={selectedProduct.images[currentImageIndex]} alt="Product" className="modal-image" />
                            <button className="next-button" onClick={nextImage}>&#10095;</button>
                        </div>

                        <h2 className="modal-title">{selectedProduct.title}</h2>
                        <p className="modal-description">{selectedProduct.description}</p>
                        <p className="model-rating">Rating: {selectedProduct.rating}</p>
                        <p className="modal-price">₹{selectedProduct.price}</p>
                        <button onClick={(e) => {e.stopPropagation(); addToCart(selectedProduct)}} className='cart-button'>
                                    Cart <i className="fa-solid fa-cart-shopping"></i>
                                </button>
                    </div>
                </div>
            )}
        </div>   
    );
}
export default Perform;
