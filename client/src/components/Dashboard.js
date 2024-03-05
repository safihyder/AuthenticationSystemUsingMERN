import React, { useEffect,useContext } from 'react'
import { LoginContext } from './ContextProvider/Context';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState } from 'react';


const Dashboard = () => {
  const [data, setdata] = useState(false)
    const {logindata,setLogindata}=useContext(LoginContext)
    // console.log(logindata.validUserOne)
    const history=useNavigate();
    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
            }
        })
        const data = await res.json();
        console.log(data)
        if(data.status === 401 || ! data){
            console.log(data)
            history("*");
        }else{
            console.log("user verify")
            setLogindata(data);
            history("/dash")

        }
    }
    useEffect(() => {
        setTimeout(() => {
          DashboardValid();
          setdata(true);
        }, 2000);    
      },[])
    return (

        <>
       {
        data?(<>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src="/man.png" alt="" style={{ width: "200px", marginTop: 20 }} />
                <h1>User Email:{logindata?logindata.validUserOne.email:""}</h1>
            </div>
        </>)
        : <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center',height:'100vh' }}>
    Loading...&nbsp;
   <CircularProgress />
 </Box>
 }
        </>
    )
}

export default Dashboard