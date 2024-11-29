import React from "react";
import "../style/Login.css";
import  { useNavigate } from "react-router-dom";

function Login() {  
    const Navigate = useNavigate();
    const OnClickLogin = () => {
        Navigate("/Perform");
        console.log('Login clicked')
    }
    return(
        <div className='login'>
            <div className='login-form'>
                <h1>Login</h1>
                <input type='email' placeholder='Email' className='input-field' /><br />
                <input type='password' placeholder='Password' className='input-field' /><br />
                <button  onClick={OnClickLogin} className='login-button'>Login</button>
                {/* onClick={OnClickLogin} */}
            </div>
        </div>
    )
}
export default Login;