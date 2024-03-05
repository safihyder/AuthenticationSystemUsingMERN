import { useState } from "react"
import React from 'react'
import { Link,useNavigate } from "react-router-dom";
import "./mix.css";
const Login = () => {
  const [passShow, setPassShow] = useState(false);
  const [inpval,setinpval]=useState({
    email:"",
    password:""
  })
  const history=useNavigate();
  const setVal=(e)=>{
    const {name,value}=e.target;
    setinpval(()=>{
      return {
        ...inpval,
        [name]:value
      }
    })
  }
  const loginuser=async (e)=>{
    e.preventDefault();
    const {email,password}=inpval;
   if(email===""){
      alert("Please enter your email");
    }else if(password===""){
      alert("Enter you password");
    }else if(!email.includes("@")){
      alert("Enter valid email");
    }else if(password.length<6){
      alert("Password must be atleast 6 character")
    }else{
      const data=await fetch("/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
         email,password
        })
      });
      const res=await data.json();
      console.log(res)
      if(res.status===201){
        localStorage.setItem("usersdatatoken",res.result.token)
        history("/dash");
        setinpval({...inpval,email:"",password:""})
      }
      
    }
  }
  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Welcome back,Log in </h1>
            <p>Hi,we are glad you are back,Please Login</p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' id='email' onChange={setVal} value={inpval.email}  placeholder='Enter your Email' />
            </div>
           
            <div className='form_input'>
              <label htmlFor="password">Password</label>
              <div className='two'>
                <input type={!passShow ? "password" : "text"} name='password' id='password' onChange={setVal} value={inpval.password} placeholder='Enter your password' />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={loginuser}>Login</button>
            <p>Don't have an account? <Link to='/register' relative="path"> Sign Up</Link></p>
          </form>
        </div>
      </section>
    </>
  )
}
export default Login;