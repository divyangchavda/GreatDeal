import React, { useState, useEffect } from 'react';
import '../style/adminperfrom.css';
import axios from 'axios'; add 

function Adminperform({ selectedItems }) {
    const [allProducts, setAllProducts] = useState([]); // Unified state for products
    const [isVisible, setIsVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        title: "",
        images: "",
        description: "",
        price: "",
        rating: "",
        category: "",
    });

    // Sync `selectedItems` with `allProducts` whenever `selectedItems` changes
    useEffect(() => {
        setAllProducts(selectedItems);
    }, [selectedItems]);

    
    const onAdd = (e) => {
        e.preventDefault();
    
        if (newProduct.title === "" || newProduct.price === "") {
            alert("Please fill all the required fields!");
            return;
        }
    
        if (newProduct._id) {
            // If _id exists, update the product
            axios
                .put(`http://localhost:8000/api/product/update/${newProduct._id}`, newProduct)
                .then((res) => {
                    setAllProducts((prevProducts) =>
                        prevProducts.map((item) =>
                            item._id === newProduct._id ? res.data : item
                        )
                    );
                })
                .catch((err) => console.error("Error updating product:", err));
        } else {
            // If no _id, create a new product
            axios
                .post('http://localhost:8000/api/product/create', newProduct)
                .then((res) => {
                    setAllProducts((prevProducts) => [...prevProducts, res.data]);
                })
                .catch((err) => console.error("Error adding product:", err));
        }
    
        setNewProduct({
            title: "",
            images: "",
            description: "",
            price: "",
            rating: "",
            category: "",
        });
        setIsVisible(false);
    };
    

    // Edit Product Function
    const onClickEdit = (id) => {
        const product = allProducts.find((item) => item._id === id);
        setNewProduct(product); // Populate the form with the product to be edited
        setIsVisible(true); // Show the modal for editing
    };

    // Delete Product Function
    const onDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/product/delete/${id}`);
            setAllProducts((prevProducts) => prevProducts.filter((item) => item._id !== id)); // Remove product from state
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Close Modal
    const onHide = () => {
        setIsVisible(false);
    };

    return (
        <div className="adminperform">
            <table className="table-p">
                <thead>
                    <tr>
                        <th>
                            <button onClick={() => setIsVisible(true)}>Add Product</button>
                        </th>
                    </tr>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Image</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th>Product Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className="tbody-div">
                    {allProducts.length > 0 ? (
                        allProducts.map((e) => (
                            <tr key={e._id}>
                                <td>{e.title}</td>
                                <td>
                                    <img
                                        src={e.images}
                                        alt={e.title}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                </td>
                                <td>{e.description}</td>
                                <td>{e.price}</td>
                                <td>{e.category}</td>
                                <td>
                                    <button onClick={() => onClickEdit(e._id)}>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => onDelete(e._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>
                                No products available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for Add/Edit Product */}
            <div className={`model ${isVisible ? 'visible' : 'hidden'}`}>
                <form className="form-div" onSubmit={onAdd}>
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newProduct.title}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, title: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Product Image"
                        value={newProduct.images}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, images: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Product Description"
                        value={newProduct.description}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, description: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Product Price"
                        value={newProduct.price}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Product Rating"
                        value={newProduct.rating}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, rating: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Product Category"
                        value={newProduct.category}
                        onChange={(e) =>
                            setNewProduct({ ...newProduct, category: e.target.value })
                        }
                    />
                    <button type="submit">Add</button>
                    <button type="submit">Update</button>
                    <button type="button" onClick={onHide}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default Adminperform;
