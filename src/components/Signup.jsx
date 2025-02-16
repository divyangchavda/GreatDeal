import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../style/signup.css'

function Signup(){
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const navigate=useNavigate()
    function login(){
        axios.post('http://localhost:8000/api/product/UserCreate',{
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
        // <div className="All">
        //     <div className="Login">
        //         <div className="userlogin">
        //             <h1>Register</h1>
        //             <input type="text" name="name" placeholder="Enter Name" autoComplete="off" onChange={(e)=>setName(e.target.value)}></input>
        //             <input type="text" name="email" placeholder="Enter Email" autoComplete="off" onChange={(e)=>setEmail(e.target.value)}></input>
        //             <input type="password" name="password" placeholder="Enter Password" autoComplete="off" onChange={(e)=>setPassword(e.target.value)}></input>
        //             <button onClick={login}>Register</button>
        //         </div>
        //     </div>
        // </div>
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