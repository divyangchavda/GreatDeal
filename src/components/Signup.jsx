import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../style/signup.css'
function Signup(){
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    console.log("ApibaseUrl",API_BASE_URL)  

    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const navigate=useNavigate()
    function login(){
        axios.post(`http://localhost:8000/api/product/UserCreate`,{
            name,email,password
        })
        .then((result)=>{
            console.log(result)
            navigate('/Login')
        }
    ) 
    }
    function Tologinpage(){
        navigate('/Login')
    }

    return (
        
        <div className='signup'>
             <div className='signup-form' >
                 <h1>Sign Up</h1>                 
                 <input type='text' placeholder='Username' className='input-field' autoComplete="off" name='UserName' onChange={(e)=>setName(e.target.value)}/><br />
                <input type='email' placeholder='Email' className='input-field'   name='Email' autoComplete="off" onChange={(e)=>setEmail(e.target.value)} /><br />        
                <input type='password' placeholder='Password' className='input-field' autoComplete="off" name='Password' onChange={(e)=>setPassword(e.target.value)} /><br />
  
               <button   onClick={login}  className='signup-button'>Sign Up</button>
               <p>Already have an account?<button onClick={Tologinpage}>Login</button></p>
               
           </div>
         </div>
    )

}

export default Signup
