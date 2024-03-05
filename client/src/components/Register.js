import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, csetPassShow] = useState(false);
  const [inpval,setinpval]=useState({
    fname:"",
    email:"",
    password:"",
    cpassword:""
  })
  // console.log(inpval)
  const setVal=(e)=>{
    const {name,value}=e.target;
    setinpval(()=>{
      return {
        ...inpval,
        [name]:value
      }
    })
  }
  const addUserData=async (e)=>{
    e.preventDefault();
    const {fname,email,password,cpassword}=inpval;
    if(fname===""){
      alert("Enter your name");
    }else if(email===""){
alert("Enter your email");
    }else if(password===''){
      alert("Enter you password");
    } else if(cpassword===""){
      alert("Confirm you password");
    }else if(!email.includes("@")){
      alert("Enter valid email");
    }else if(password.length<6){
      alert("Password must be atleast 6 character")
    }else if(cpassword.length<6){
      alert("Password must be atleast 6 character")
    }else if(password !== cpassword){
      alert("Password doesn't match");
    }else{
      const data=await fetch("/register",{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          fname,email,password,cpassword
        })
      });
      const res=await data.json();
      if(res.status===201){
        alert("User registration done");
        setinpval({...inpval,fname:"",email:"",password:"",cpassword:""})
      }
    }
  }
  return (
    <>
      <section>
        <div className='form_data'>
          <div className='form_heading'>
            <h1>Sign Up</h1>
            <p style={{textAlign:'center'}}>We are glad that you will be using Project Cloud to manage <br /> your tasks!We hope that you will get like it. </p>
          </div>
          <form>
            <div className='form_input'>
              <label htmlFor="fname">Name</label>
              <input type='text' name='fname'  onChange={setVal} value={inpval.fname} id='fname' placeholder='Enter your name' />
            </div>
            <div className='form_input'>
              <label htmlFor="email">Email</label>
              <input type='email' name='email' id='email' onChange={setVal} value={inpval.email} placeholder='Enter your email address' />
            </div>
            <div className='form_input'>
              <label htmlFor="password"  >Password</label>
              <div className='two'>
                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name='password' id='password' placeholder='Enter your password' />
                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                  {!passShow ? "Show" : "Hide"}
                </div> 
              </div>
            </div>
            <div className='form_input'>
              <label htmlFor="cpassword">Confirm Password</label>
              <div className='two'>
                <input type={!cpassShow ? "password" : "text"} name='cpassword' id='cpassword'onChange={setVal} value={inpval.cpassword} placeholder='Confirm password' />
                <div className="showpass" onClick={() => csetPassShow(!cpassShow)}>
                  {!cpassShow ? "Show" : "Hide"}
                </div> 
              </div>
            </div>
            <button className="btn" onClick={addUserData}>Signup</button>
            <p>Already have an account? <Link to="/login">Log In</Link> </p>
          </form>
        </div>
      </section></>
  )
}

export default Register;