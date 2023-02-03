import React, { useState } from 'react'
import background from "../images/login_background.jpg";
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import "./Login.css"

import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { paper } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: 'rgba(255, 255, 255, 0.6)',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        text: {
            primary: "rgba(255, 255, 255, 0.8)"
        }
    },
});


const Login = () => {
    const [isValid, setIsValid] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dirty, setDirty] = useState(false);

    const handleEmailChange = (e) => {
        const val = e.target.value;

        if (isEmail(val)) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
        setEmail(val);
    }

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setPassword(val);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login API called")
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className='login-container h-full w-screen' style={{ backgroundImage: `url(${background})` }} >
                    <div className='bg-[#032538] min-h-screen h-full w-full md:w-6/12 lg:w-5/12 px-12 py-14'>
                        <h1 className='text-[4.5rem] font-bold text-white max-w-md mx-auto md:mx-0'>
                            RIM
                        </h1>
                        <h1 className='text-[4.5rem] font-bold text-white max-w-md mx-auto md:mx-0'>
                            Portal
                        </h1>
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            className='flex flex-col px-2 gap-8 py-12 max-w-md mx-auto md:mx-0 relative'
                        >
                            <TextField error={dirty && !isValid} id="standard-basic" label="Enter email" variant="standard" value={email} onBlur={() => setDirty(true)} onChange={(e) => handleEmailChange(e)} InputLabelProps={{
                                style: {
                                    color: 'rgba(255, 255, 255, 0.6)',
                                }
                            }} />
                            {dirty && !isValid && <p className={`absolute text-[#d32f2f] font-normal text-xs top-24 left-2`}>Enter valid email address</p>}
                            <TextField id="standard-basic" label="Password" variant="standard" type="password" value={password} onChange={(e) => handlePasswordChange(e)} InputLabelProps={{
                                style: {
                                    color: 'rgba(255, 255, 255, 0.6)'
                                }
                            }} />
                            <div className='flex justify-end items-center'>
                                {(password.length && isValid) ?
                                    <Button
                                        style={{
                                            backgroundColor: "#021018",
                                            color: "white",
                                            padding: "0.5rem 2rem",
                                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)"
                                        }}
                                        className='shadow-lg'
                                        variant="contained"
                                        onClick={(e) => handleSubmit(e)}
                                    >
                                        Login
                                    </Button> :
                                    <Button
                                        style={{
                                            backgroundColor: "#021018",
                                            color: "white",
                                            padding: "0.5rem 2rem",
                                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
                                            cursor: "not-allowed",
                                            userSelect: "none"
                                        }}
                                        className='shadow-lg'
                                        variant="contained"
                                        disabled
                                    >
                                        Login
                                    </Button>
                                }
                            </div>
                        </Box>
                        <div className=' flex items-center justify-between mt-4 max-w-sm mx-auto'>
                            <div className='bg-white rounded-full w-20 h-20 shadow-2xl shadow-black/60 grid place-items-center'>Logo</div>
                            <div className='bg-white rounded-full w-20 h-20 shadow-2xl shadow-black/60 grid place-items-center'>Logo</div>
                            <div className='bg-white rounded-full w-20 h-20 shadow-2xl shadow-black/60 grid place-items-center'>Logo</div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

export default Login