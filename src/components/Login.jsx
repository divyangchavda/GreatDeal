import React,{useState,useEffect} from "react";
import "../style/Login.css";
import  { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    
   
    const onClickAdmin=()=>{
        if(email==="Admin" && password==="Admin"){
            Navigate('/Admin');
        }
        if(email!=="Admin" && password!=="Admin"){
            alert("Invalid Admin Credentials")
        }
    }
    const OnClickLogin = () => {
        try{
        axios.post(`${API_BASE_URL}/api/product/UserLogin`, { email, password },{withCredentials:true})
            .then((res) => {
                const data = res.data;
                console.log(res.data);
                Navigate('/Perform');
                console.log(email);
                if(data.email===email && data.password===password){
                    alert("Login Successfull")
                }
                if(data.email!==email && data.password===password){
                    alert("Invalid Email")
                }
                if(data.email===email && data.password!==password){
                    alert("Invalid Password")
                }
               if (data.email!==email && data.password!==password){
                    alert("Invalid Credentials")
                    console.log("Invalid Credentials")
                }
               
            })
            .catch((error) => {
                console.log(error);
                alert("Invalid Credentials")
            });
        }catch(error){
            console.log("onclickLogin not running")
        }  
    }
    // const onClickAdmin=()=>{
        
    //     Navigate("/Admin");
    //     console.log('Admin clicked')
    // }
    return(
        <div className='login'>
            <div className='login-form'>
                <h1>Login</h1>
                <button className='admin-btn' onClick={onClickAdmin}>Admin</button>
                
                <input type='email' placeholder='Email' className='input-field'  onChange={(e)=>setEmail(e.target.value)}/><br />
                <input type='password' placeholder='Password' className='input-field' onChange={(e)=>setPassword(e.target.value)}/><br />
                <button  onClick={OnClickLogin} className='login-button'>Login</button>
                {/* onClick={OnClickLogin} */}
            </div>
        </div>
    )
}
export default Login;
