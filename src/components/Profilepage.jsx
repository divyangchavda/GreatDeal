import React, { useState, useEffect } from "react";
import "../style/Profilepage.css";
import Header from "./Header.jsx";
import axios from "axios";

function Profilepage() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        gender: "Male",
        age: "",
    });

    useEffect(() => {
       // Prevent unnecessary API calls

       
        
        axios.post(`http://localhost:8000/api/product/UserDetail`,{},{withCredentials:true})
            .then((res) => {
                console.log("User data fetched:", res.data);
                setUser(res.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });

    }, []); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const OnClickSubmitDetail = async (e) => {
        e.preventDefault(); 

        try {
            console.log("Updating user:", user);
            
            const res = await axios.put(
                `http://localhost:8000/api/product/UserDetailUpadate`,user,{withCredentials:true} );

            console.log("Updated user:", res.data);
            setUser(res.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="profile-container">
                <h2>User Profile</h2>
                <div className="profile-card">
                    <form onSubmit={OnClickSubmitDetail}>
                        <label>Name:</label>
                        <input type="text" name="name" value={user.name} onChange={handleChange} required />

                        <label>Email:</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange} required />

                        <label>Address:</label>
                        <input type="text" name="address" value={user.address} onChange={handleChange} />

                        <label>Gender:</label>
                        <select name="gender" value={user.gender} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <label>Age:</label>
                        <input type="number" name="age" value={user.age} onChange={handleChange} min="1" required />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profilepage;
