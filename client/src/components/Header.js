import React, { useContext, useEffect } from 'react'
import './header.css'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
export default function Header() {
    const { logindata, setLogindata } = useContext(LoginContext);
    console.log(logindata.validUserOne)
    const history = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");
        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        })
        const data = await res.json();
        // console.log(data)
        if (data.status === 201) {
            console.log("user logout")
            history("/")
            localStorage.removeItem("usersdatatoken");
            setLogindata(false);
            } else {
                console.log("error");
            }
           
            

    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goDash = () => {
        history("/dash");
    }
    const goError = () => {
        history('*');
    }
    return (
        <header>
            <nav>
                <h1>
                    HP Cloud
                </h1>
                <div className="avtar">
                    {
                        logindata.validUserOne ? <Avatar style={{ background: "salmon", fontWweight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.validUserOne.fname[0].toUpperCase()}</Avatar>
                            : <Avatar style={{ background: "blue" }} onClick={handleClick} />
                    }
                </div>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {
                        logindata ? (
                            <>
                                <MenuItem onClick={() => {
                                    goDash()
                                    handleClose()
                                }}>Profile</MenuItem>
                                <MenuItem onClick={()=>{
                                    logoutuser()
                                    handleClose()
                                    }}>Logout</MenuItem>
                            </>
                        )
                            : (
                                <>
                                    <MenuItem onClick={() => {
                                        goError()
                                        handleClose()
                                    }}>Profile</MenuItem>
                                </>
                            )
                    }
                </Menu>
            </nav>
        </header>
    )
}
