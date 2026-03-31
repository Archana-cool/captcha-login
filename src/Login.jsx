import React, { useState } from 'react'
import './Login.css';
import RECAPTCHA from "react-google-recaptcha";

const Login = () => {

     const[form,setForm]=useState({
        username:"",
        email:"",
        password:"",
    })
    const [error,setError]=useState({})
    const validation=()=>{
        const newError=({})
        if(!form.username) newError.username="invalid username";
        if(!form.email) newError.email="invalid email";
        else
        if(!/\S+@\S+\.\S+/.test(form.email)) newError.email="missing error";
        if(!form.password) newError.password="invalid password";
        else{
            if(form.password.length<8) newError.password="must in 8 character";
            if(!/[a-z]/.test(form.password)) newError.password="must one lowercase character";
            if(!/[A-Z]/.test(form.password)) newError.password="must one Uppercase character";
            if(!/[!@#]/.test(form.password)) newError.password="must one in special character";

    }
    
   
    return newError;
}
const handleChange=(e)=>{
    const{name,value}=e.target;
    setForm({
        ...form,
        [name]:value,
    })
}
const handleSubmit=(e)=>{
    e.preventDefault();
    const validationerror=validation();
    if(Object.keys(validationerror).length===0)
    {
        console.log("form valid",form)
        console.log(captchaInput)
        //  console.log("Captcha Value:", captchaValue)
        alert("Successfully Login");
        setForm({
            username:"",
            email:"",
            password:"",
        })
       
        setError({});
    }
    else{
        setError(validation());
    }
}
const [num1] = useState(Math.floor(Math.random() * 10))
const [num2] = useState(Math.floor(Math.random() * 10))
const [captchaInput, setCaptchaInput] = useState("")
const [captchaError, setCaptchaError] = useState("")

const checkCaptcha = () => {
  if (parseInt(captchaInput) !== num1 + num2) {
    setCaptchaError("Wrong answer")
    return false
  }
  setCaptchaError("")
  return true
}

  return (
    <div>
        <h2 class="head">Login Form</h2>
        <form onSubmit={handleSubmit}>
         <div class="form1">
            <label><b>USERNAME</b></label>
            <input type="text" name="username" placeholder='username' onChange={handleChange} value={form.username} className='ms-3'/>
            {error.username&&<p>{error.username}</p>}        
         </div>
         <div className='form2'>
            <label><b>EMAIL</b></label>
            <input type="email" name='email' placeholder='Enter email' onChange={handleChange} value={form.email} className='ms-3'/>
            {error.email&&<p>{error.email}</p>}
         </div>
         <div className='form3'>
            <label><b>PASSWORD</b></label>
             <input type="password" name='password' placeholder='Enter password' onChange={handleChange} value={form.password} className='ms-3'/>
            {error.password&&<p>{error.password}</p>}
         </div>
        <div>  
            <h4>CAPTCHA </h4> 
            <p class="cap">{num1} + {num2} = ?</p>
            <input onChange={(e)=>setCaptchaInput(e.target.value)} />

            {captchaError && <p>{captchaError}</p>}
        </div>
         <button class="btn btn-primary">submit</button>
        </form>

    </div>
  )
}

export default Login