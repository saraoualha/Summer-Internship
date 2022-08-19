import * as React from 'react';
import './Signup.css'
import axios from "axios";

import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommHeader from '../../Assests/Common/CommHeader';

import { FormLabel, FormControl } from "@chakra-ui/form-control";
import { useToast } from "@chakra-ui/toast";
//import { useToast } from " @chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';


const theme = createTheme();

export default function Signup() {
    const [name, setName] = React.useState()
    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [confirmpassword, setConfirmpassword] = React.useState()
    const [pic, setPic] = React.useState()
    const toast = useToast();
    const navigate = useNavigate();

    const postDetails = (pics) => {
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "internship");
            data.append("cloud_name", "dw7pjrhte");
            fetch("https://api.cloudinary.com/v1_1/dw7pjrhte/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
    };

    const submitHandler = async () => {
        if (!name || !email || !password || !confirmpassword) {
            console.log('Please Fill all the Fileds')
            toast({
                title: "Please Fill all the Fileds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;

        }
        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        console.log(name, email, password, pic);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/user",
                {
                    name,
                    email,
                    password,
                    pic,
                },
                config
            );
            console.log(data);
            toast({
                title: "Registration Successful",
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
            //setLoading(false);
        }
    };

    return (
        <div>
            <div>
                <CommHeader />
            </div>
            <ChakraProvider>
                <ThemeProvider theme={theme}>

                    <Container style={{ backgroundColor: '#7993b5', borderRadius: '12px', height: '500px' }} component="main" maxWidth="xs" >

                        <CssBaseline />

                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div  >
                                <Typography component="h1" variant="h5" style={{ marginLeft: '150px', marginTop: '0px' }}>
                                    Sign Up
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 1 }} >
                                    <FormLabel>Full name</FormLabel>
                                    <div style={{ marginTop: '10px' }}></div>
                                    <input
                                        id="name"
                                        class="form-control"
                                        placeholder='Enter your full name'
                                        style={{ backgroundColor: '#F1EFEF' }}
                                        onChange={(e) => { setName(e.target.value) }}
                                    />

                                    <div style={{ marginTop: '15px' }}></div>

                                    <FormLabel>Email Address</FormLabel>
                                    <div style={{ marginTop: '10px' }}></div>
                                    <input
                                        id="email"
                                        class="form-control"
                                        placeholder='Enter your Email'
                                        style={{ backgroundColor: '#F1EFEF' }}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />

                                    <div style={{ marginTop: '15px' }}></div>

                                    {/* <InputGroup></InputGroup> */}
                                    <FormLabel>Password</FormLabel>
                                    <div style={{ marginTop: '10px' }}></div>
                                    <input
                                        id="password"
                                        class="form-control"
                                        type="password"
                                        placeholder='Enter your password'
                                        style={{ backgroundColor: '#F1EFEF' }}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />

                                    <div style={{ marginTop: '15px' }}></div>

                                    <FormLabel>Confirm Password</FormLabel>
                                    <div style={{ marginTop: '10px' }}></div>
                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder='Confirm your password'
                                        style={{ backgroundColor: '#F1EFEF' }}
                                        onChange={(e) => { setConfirmpassword(e.target.value) }}
                                    />
                                    <div style={{ marginTop: '10px' }}></div>
                                    <FormControl id="pic">
                                        <FormLabel >Upload your Picture</FormLabel>
                                        <input

                                            type="file"
                                            p={1.5}
                                            accept="image/*"
                                            onChange={(e) => postDetails(e.target.files[0])}
                                        />
                                    </FormControl>

                                    <Grid>
                                        <button
                                            margin="normal"
                                            className="comm-button"
                                            onClick={(e) => { submitHandler(); e.preventDefault() }}
                                        >
                                            Sign up
                                        </button>
                                    </Grid>

                                </Box>
                            </div>
                        </Box>
                    </Container>
                </ThemeProvider>
            </ChakraProvider>
        </div>
    );
}