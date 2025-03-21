import React,{useState,useEffect} from "react";
import "../style/Login.css";
import  { useNavigate } from "react-router-dom";
import axios from "axios";


function Login({setLogUserId}) {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    useEffect(()=>{
        setLogUserId(email);
    },[email])
    const OnClickLogin = () => {
        try{
        axios.post('http://localhost:8000/api/product/UserLogin', { email, password })
            .then((res) => {
                console.log(res.data);
                Navigate('/Perform');
                console.log(email);
            })
            .catch((error) => {
                console.log(error);
            });
        }catch(error){
            console.log("onclickLogin not running")
        }
      
        
    }
    const onClickAdmin=()=>{
        Navigate("/Admin");
        console.log('Admin clicked')
    }
    return(
        <div className='login'>
            <div className='login-form'>
                <h1>Login</h1>
                <button className='admin-btn' onClick={onClickAdmin}>Admin</button>
                
                <input type='email' placeholder='Email' className='input-field'  onChange={(e)=>setEmail(e.target.value)}/><br />
                <input type='password' placeholder='Password' className='input-field' onChange={(e)=>setPassword(e.target.value)}/><br />
                <button  onClick={()=>Navigate('/Perform')} className='login-button'>Login</button>
                {/* onClick={OnClickLogin} */}
            </div>
        </div>
    )
}
export default Login;
