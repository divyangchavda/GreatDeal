import React from 'react'
import '../style/Signup.css'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const Navigate = useNavigate();
    const onClickSignup = () => {
        Navigate('/Login');
    }
    return(
        <>
        <div className='signup'>
            <div className='signup-form'>
                <h1>Sign Up</h1>
                <input type='text' placeholder='Username' className='input-field' /><br />
                <input type='email' placeholder='Email' className='input-field' /><br />
                <input type='password' placeholder='Password' className='input-field' /><br />
                <input type='password' placeholder='Confirm Password' className='input-field' /><br />
                <button onClick={onClickSignup}  className='signup-button'>Sign Up</button>
                {/* onClick={onClickSignup} */}
            </div>
        </div>
        </>
    )
}
export default Signup;