import * as React from 'react';
import './Login.css'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

import { FormLabel } from "@chakra-ui/form-control";

import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const toast = useToast();
    const navigate = useNavigate();


    const submitHandler = async () => {
        if (!email || !password) {
            toast({
                title: "Please Fill all the Fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        // console.log(email, password);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            // console.log(JSON.stringify(data));
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            localStorage.setItem("UserId", JSON.stringify(data._id))
            let val=localStorage.getItem('UserId');
            let id=  val.substr(1,val.length-2)
            navigate(`/homepage/${id}`);
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <div>

            <Typography component="h1" variant="h5" style={{ marginLeft: '150px', marginTop: '10px' }}>
                Login
            </Typography>

            <Box component="form" noValidate sx={{ mt: 1 }} >
                
                <FormLabel>Email Address</FormLabel>
                <div style={{ marginTop: '10px' }}></div>
                <input
                    id="email"
                    class="form-control"
                    placeholder='Enter your Email'
                    style={{ backgroundColor: '#F1EFEF' }}
                    onChange={(e) => { setEmail(e.target.value) }}
                />

                <div style={{ marginTop: '25px' }}></div>

                <FormLabel>Password</FormLabel>
                <div style={{ marginTop: '10px' }}></div>
                <input
                    id='password'
                    type="password"
                    class="form-control"
                    placeholder='Enter your password'
                    style={{ backgroundColor: '#F1EFEF' }}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <Grid>
                    <Link to={"/homepage"} >
                        <button
                            margin="normal"
                            className="comm-button"
                            onClick={(e) => { e.preventDefault(); submitHandler(); }}
                        >
                            login
                        </button>
                    </Link>

                </Grid>
                <Grid container>
                    <Grid item xs>
                        <Link to={"/homepage"} className='link' variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link to={"/Signup"} className='link' variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>

            </Box>

        </div>

    );
}