import React from 'react'
import "./Login.css"
import logo from "../../assets/logo.png"
import { useState } from 'react'
const Login = () => {

const [signState,setSignstate] = useState("Sign in")


  return (
    <div className='login'>
      <img src={logo} alt="" className='login-logo'/>
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
            {signState==="Sign Up"?<input type="text" placeholder='your name'/>:""}
            
            <input type="email" placeholder='Email'/>
            <input type="password" placeholder='Password'/>
            <button className='btnlogin'>{signState}</button>
            <div className='for-help'>
                <div className="remember">
                    <input type="checkbox" />
                    <label htmlFor="">Remember me</label>
                </div>
                <p>Need help?</p>
            </div>
        </form>
        <div className="form-switch">
            {signState==="Sign In"? 
            <p>New to Netflix?<span onClick={()=>{setSignstate("Sign Up")}}>Sign up now</span></p>:
             <p>Already have an account??<span onClick={()=>{setSignstate("Sign In")}}>Sign in now</span></p>   }
        </div>
      </div>
    </div>
  )
}

export default Login
