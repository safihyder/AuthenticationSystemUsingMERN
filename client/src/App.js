import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { useEffect, useContext } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Error from './components/Error';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {
  // createBrowserRouter,
  Route,
  Routes,
  // RouterProvider,
  useNavigate,
} from "react-router-dom";
import { LoginContext } from './components/ContextProvider/Context';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/dash",
//     element: <Dashboard />,
//   },
//   {
//     path: "*",
//     element: <Error />,
//   },
// ]);
function App() {
  const [data, setdata] = useState(false)
  const { logindata, setLogindata } = useContext(LoginContext);
  const history = useNavigate();
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
    // console.log(data)
    if(data.status === 401 || !data){
      console.log("User not valid")
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
        data ?
        (
          <>
      <Header/>
<Routes>
  <Route path="/" element={<Login />}/>
  <Route path="/login" element={<Login />}/>
  <Route path="/register" element={<Register />}/>
  <Route path="/dash" element={<Dashboard />}/>
  <Route path="/*" element={<Error />}/>
</Routes>
          </>
   ) :   <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center',height:'100vh' }}>
    Loading...&nbsp;
   <CircularProgress />
 </Box>
      }
    </>
  );

}

export default App;
